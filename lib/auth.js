
import axios from "axios";
import fs from "fs";
import path from "path";

let cachedToken = null;
const TOKEN_FILE = path.join(process.cwd(), "guesty_token.json");


// export async function fetchGuestyToken() {
//   try {
//     const response = await axios.post("https://booking.guesty.com/oauth2/token", new URLSearchParams({
//       grant_type: "client_credentials",
//       client_id: process.env.GUESTY_CLIENT_ID,
//       client_secret: process.env.GUESTY_CLIENT_SECRET
//     }));

//     cachedToken = {
//       access_token: response.data.access_token,
//       expires_at: Date.now() + (response.data.expires_in * 1000)
//     };

//     fs.writeFileSync(TOKEN_FILE, JSON.stringify(cachedToken, null, 2));
//     console.log("✅ Guesty token refreshed!");
//     return cachedToken.access_token;
//   } catch (err) {
//     console.error("❌ Error fetching Guesty token:", err.response?.data || err.message);
//     return null;
//   }
// }

// export async function getGuestyToken() {
//   if (process.env.NODE_ENV === 'development') {
//     if (!fs.existsSync(TOKEN_FILE)) return fetchGuestyToken();
//     const data = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
//     if (Date.now() < data.expires_at) {
//       console.log("✅ Using cached Guesty token");
//       return data.access_token;
//     }
//     return fetchGuestyToken();
//   }
//   else {
//     if ((!cachedToken || Date.now() >= cachedToken.expires_at)) {
//       return await fetchGuestyToken();
//     }
//     console.log("✅ Using cached Guesty token");
//     return cachedToken.access_token;
//   }
// }







// const TOKEN_FILE = path.join(process.cwd(), "guesty_token.json");

export async function fetchGuestyToken() {
  try {
    const response = await axios.post("https://booking.guesty.com/oauth2/token", new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.GUESTY_CLIENT_ID,
      client_secret: process.env.GUESTY_CLIENT_SECRET
    }));

    const tokenData = {
      access_token: response.data.access_token,
      expires_at: Date.now() + (response.data.expires_in * 1000)
    };

    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
    console.log("✅ Guesty token refreshed!");
    return tokenData.access_token;

  } catch (err) {
    console.error("❌ Error fetching Guesty token:", err.response?.data || err.message);
    return null;
  }
}

export function getGuestyToken() {
    // return process.env.GUESTY_FALLBACK_TOKEN;
  if (!fs.existsSync(TOKEN_FILE)) return fetchGuestyToken();
  const data = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
  if (Date.now() < data.expires_at) {
    console.log("✅ Using cached Guesty token");
    return data.access_token;
  }
  return fetchGuestyToken();
}
