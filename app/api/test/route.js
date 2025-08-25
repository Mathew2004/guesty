import crypto from 'crypto';
import { NextResponse } from 'next/server';

const API_KEY = 'c9fb197970150c2c6cd3c8819e746f13';
const SECRET = '65970ef37a';
const ENDPOINT = 'https://api.test.hotelbeds.com';

// Generate signature for HotelBeds API - Exact implementation as per docs
function generateSignature() {
  const timestamp = Math.floor(Date.now() / 1000);
  const assemble = API_KEY + SECRET + timestamp;
  const signature = crypto.createHash('sha256').update(assemble).digest('hex');
  
  console.log('=== HotelBeds API Test ===');
  console.log('API_KEY:', API_KEY);
  console.log('SECRET:', SECRET.substring(0, 3) + '***');
  console.log('Timestamp:', timestamp);
  console.log('Assemble string length:', assemble.length);
  console.log('Generated signature:', signature);
  console.log('========================');
  
  return { signature, timestamp };
}

export async function GET() {
  try {
    // Test 1: Basic connectivity
    console.log('=== Testing HotelBeds API Connectivity ===');
    
    const { signature, timestamp } = generateSignature();
    
    const headers = {
      'Api-key': API_KEY,
      'X-Signature': signature,
      'Accept': 'application/json',
    };

    // Try the simplest endpoint first - just get a few countries
    const url = `${ENDPOINT}/hotel-content-api/1.0/locations/countries?fields=all&language=ENG&from=1&to=3`;
    
    console.log('Request URL:', url);
    console.log('Request Headers:');
    console.log('- Api-key:', API_KEY);
    console.log('- X-Signature:', signature);
    console.log('- Accept: application/json');
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
      timeout: 10000 // 10 second timeout
    });

    console.log('Response Status:', response.status);
    console.log('Response Status Text:', response.statusText);
    
    const responseHeaders = Object.fromEntries(response.headers.entries());
    console.log('Response Headers:', responseHeaders);

    let responseBody;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }
    
    console.log('Response Body:', responseBody);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'API request failed',
        details: {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseBody,
          requestInfo: {
            url,
            timestamp,
            apiKey: API_KEY,
            signature: signature
          }
        }
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: 'API connection successful',
      data: responseBody,
      requestInfo: {
        url,
        timestamp,
        signature: signature.substring(0, 8) + '...'
      }
    });

  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Test failed', 
        details: {
          message: error.message,
          stack: error.stack,
          name: error.name
        }
      }, 
      { status: 500 }
    );
  }
}
