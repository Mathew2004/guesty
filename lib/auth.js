// Token management utility for Guesty OAuth2 authentication
// Following Guesty's recommendation: cache token for 24 hours to avoid rate limits
// Auto-initializes token on server startup and refreshes every 24 hours

let cachedToken = null;
let tokenExpiresAt = null;
let refreshPromise = null; // To prevent multiple simultaneous refresh requests
let lastRefreshAttempt = 0;
let autoRefreshTimer = null; // Timer for automatic 24-hour refresh
let isInitialized = false; // Flag to track if we've done initial token fetch

const TOKEN_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MIN_REFRESH_INTERVAL = 60000; // Minimum 1 minute between refresh attempts

// Initialize token on server startup
async function initializeToken() {
    if (isInitialized) {
        return;
    }

    console.log('🚀 Initializing Guesty token on server startup...');
    isInitialized = true;

    try {
        await refreshGuestyToken();
        scheduleAutoRefresh();
        console.log('✅ Token initialization complete');
    } catch (error) {
        console.error('❌ Failed to initialize token on startup:', error);
        // Try to use fallback token if available
        const fallbackToken = process.env.GUESTY_FALLBACK_TOKEN;
        if (fallbackToken) {
            console.log('🔄 Using fallback token for startup');
            cachedToken = fallbackToken;
            tokenExpiresAt = Date.now() + TOKEN_CACHE_DURATION;
            scheduleAutoRefresh();
        }
    }
}

// Schedule automatic token refresh every 24 hours
function scheduleAutoRefresh() {
    // Clear any existing timer
    if (autoRefreshTimer) {
        clearTimeout(autoRefreshTimer);
    }

    // Calculate time until next refresh (23 hours from now to be safe)
    const refreshIn = 23 * 60 * 60 * 1000; // 23 hours

    autoRefreshTimer = setTimeout(async () => {
        console.log('⏰ Automatic 24-hour token refresh triggered');
        try {
            await refreshGuestyToken();
            scheduleAutoRefresh(); // Schedule next refresh
            console.log('✅ Automatic token refresh completed');
        } catch (error) {
            console.error('❌ Automatic token refresh failed:', error);
            // Retry in 1 hour on failure
            setTimeout(() => scheduleAutoRefresh(), 60 * 60 * 1000);
        }
    }, refreshIn);

    console.log(`📅 Next automatic token refresh scheduled in ${Math.round(refreshIn / (60 * 60 * 1000))} hours`);
}

export async function getGuestyToken() {

    return process.env.GUESTY_FALLBACK_TOKEN;
    // Initialize token if not done yet
    if (!isInitialized) {
        await initializeToken();
    }

    // Check if we have a valid cached token (with generous buffer)
    //   if (cachedToken && tokenExpiresAt && Date.now() < (tokenExpiresAt - 60000)) { // 1 minute buffer
    //     const remainingTime = Math.floor((tokenExpiresAt - Date.now()) / 1000);
    //     console.log(`🔑 Using cached token, expires in: ${remainingTime} seconds`);
    //     return cachedToken;
    //   }

    //   // If a refresh is already in progress, wait for it
    //   if (refreshPromise) {
    //     console.log('⏳ Token refresh already in progress, waiting...');
    //     try {
    //       return await refreshPromise;
    //     } catch (error) {
    //       console.error('Refresh promise failed:', error);
    //       refreshPromise = null;
    //       // Fall through to try refresh again or use fallback
    //     }
    //   }

    // Check if we should wait before attempting refresh (rate limiting)
    const now = Date.now();
    if (now - lastRefreshAttempt < MIN_REFRESH_INTERVAL) {
        const waitTime = MIN_REFRESH_INTERVAL - (now - lastRefreshAttempt);
        console.log(`🔄 Rate limiting: waiting ${Math.ceil(waitTime / 1000)} seconds before token refresh...`);

        // Use fallback token if available while waiting
        const fallbackToken = process.env.GUESTY_FALLBACK_TOKEN;
        if (fallbackToken) {
            console.log('🔄 Using fallback token while waiting for rate limit cooldown');
            return fallbackToken;
        }
    }

    // Attempt to refresh the token
    try {
        refreshPromise = refreshGuestyToken();
        const token = await refreshPromise;
        refreshPromise = null;
        return token;
    } catch (error) {
        refreshPromise = null;
        console.error('Token refresh failed:', error);

        // If refresh fails due to rate limiting, use fallback token
        if (error.message.includes('429') || error.message.includes('TOO_MANY_REQUESTS')) {
            const fallbackToken = process.env.GUESTY_FALLBACK_TOKEN;
            if (fallbackToken) {
                console.log('🔄 Using fallback token due to rate limit error');
                // Set a future expiration to avoid immediate retry
                tokenExpiresAt = Date.now() + (30 * 60 * 1000); // 30 minutes
                return fallbackToken;
            }
        }

        throw error;
    }
}

// Handle 401 unauthorized errors by forcing token refresh
export async function handleUnauthorizedError() {
    console.log('Handling 401 Unauthorized error - forcing token refresh');
    cachedToken = null;
    tokenExpiresAt = null;
    refreshPromise = null;

    try {
        const newToken = await getGuestyToken();
        console.log('New token obtained after 401 error');
        return newToken;
    } catch (error) {
        console.error('Failed to refresh token after 401 error:', error);
        throw error;
    }
}

export async function refreshGuestyToken() {
    try {
        lastRefreshAttempt = Date.now();

        const tokenUrl = process.env.GUESTY_TOKEN_URL;
        const clientId = process.env.GUESTY_CLIENT_ID;
        const clientSecret = process.env.GUESTY_CLIENT_SECRET;
        const grantType = process.env.GUESTY_GRANT_TYPE || 'client_credentials';

        console.log('🔄 Refreshing Guesty token (once per 24 hours)...');

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'User-Agent': 'Guesty-Client/1.0'
            },
            body: new URLSearchParams({
                grant_type: grantType,
                client_id: clientId,
                client_secret: clientSecret
            })
        });

        console.log('🔄 Token refresh response:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Token refresh failed:', response.status, errorText);

            // If rate limited, set a longer cooldown period
            if (response.status === 429) {
                console.log('⏳ Rate limited on token refresh - will wait 1 hour before retry');
                lastRefreshAttempt = Date.now() + (60 * 60 * 1000); // Wait 1 hour
            }

            throw new Error(`Token refresh failed: ${response.status} - ${errorText}`);
        }

        const tokenData = await response.json();

        // Cache the token for the full 24-hour period as recommended by Guesty
        cachedToken = tokenData.access_token;

        // Use the actual expires_in from response, but ensure it's at least 23 hours
        const expiresInSeconds = Math.max(tokenData.expires_in || 86400, 82800); // Minimum 23 hours
        tokenExpiresAt = Date.now() + (expiresInSeconds * 1000);

        const expiresInHours = Math.floor(expiresInSeconds / 3600);
        console.log(`✅ Token cached successfully for ${expiresInHours} hours`);
        console.log(`📅 Token will expire at: ${new Date(tokenExpiresAt).toISOString()}`);
        console.log(`🔔 Next refresh needed after: ${new Date(tokenExpiresAt - 60000).toISOString()}`);

        return cachedToken;
    } catch (error) {
        console.error('❌ Error refreshing Guesty token:', error);

        // Clear cached token on error
        cachedToken = null;
        tokenExpiresAt = null;

        throw error;
    }
}

// Force token refresh (useful for testing or when token is known to be invalid)
export async function forceTokenRefresh() {
    console.log('🔄 Forcing token refresh (clearing 24-hour cache)...');
    cachedToken = null;
    tokenExpiresAt = null;
    refreshPromise = null;
    lastRefreshAttempt = 0;
    return await getGuestyToken();
}

// Get token info for debugging
export function getTokenInfo() {
    const now = Date.now();
    return {
        hasToken: !!cachedToken,
        isInitialized,
        expiresAt: tokenExpiresAt ? new Date(tokenExpiresAt).toISOString() : null,
        expiresInSeconds: tokenExpiresAt ? Math.floor((tokenExpiresAt - now) / 1000) : null,
        expiresInHours: tokenExpiresAt ? Math.floor((tokenExpiresAt - now) / (1000 * 60 * 60)) : null,
        isExpired: tokenExpiresAt ? now >= tokenExpiresAt : true,
        refreshInProgress: !!refreshPromise,
        lastRefreshAttempt: lastRefreshAttempt ? new Date(lastRefreshAttempt).toISOString() : null,
        nextRefreshAllowed: new Date(lastRefreshAttempt + MIN_REFRESH_INTERVAL).toISOString(),
        canRefreshNow: now > (lastRefreshAttempt + MIN_REFRESH_INTERVAL),
        autoRefreshScheduled: !!autoRefreshTimer
    };
}

// Initialize token on module load (server startup)
if (typeof window === 'undefined') { // Only run on server-side
    console.log('🌟 Token manager loaded - will initialize on first request');
}
