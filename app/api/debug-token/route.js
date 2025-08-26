import { NextResponse } from 'next/server';
import { getGuestyToken, getTokenInfo, forceTokenRefresh } from '../../../lib/auth.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    if (action === 'info') {
      // Just return token info without getting token
      const tokenInfo = getTokenInfo();
      return NextResponse.json({
        success: true,
        tokenInfo,
        timestamp: new Date().toISOString()
      });
    }
    
    if (action === 'refresh') {
      // Force refresh the token
      const token = await forceTokenRefresh();
      const tokenInfo = getTokenInfo();
      return NextResponse.json({
        success: true,
        message: 'Token force refreshed',
        hasToken: !!token,
        tokenInfo,
        timestamp: new Date().toISOString()
      });
    }
    
    // Default: get current token (may trigger refresh if needed)
    const token = await getGuestyToken();
    const tokenInfo = getTokenInfo();
    
    return NextResponse.json({
      success: true,
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenInfo,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Token debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      tokenInfo: getTokenInfo(),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
