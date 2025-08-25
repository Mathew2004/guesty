import crypto from 'crypto';
import { NextResponse } from 'next/server';

const API_KEY = 'c9fb197970150c2c6cd3c8819e746f13';
const SECRET = '65970ef37a';
const ENDPOINT = 'https://api.test.hotelbeds.com';

// Generate signature for HotelBeds API
function generateSignature() {
  const timestamp = Math.floor(Date.now() / 1000);
  const assemble = API_KEY + SECRET + timestamp;
  const signature = crypto.createHash('sha256').update(assemble).digest('hex');
  
  console.log('Signature generation:');
  console.log('API_KEY:', API_KEY);
  console.log('SECRET:', SECRET);
  console.log('Timestamp:', timestamp);
  console.log('Assemble string:', assemble);
  console.log('Generated signature:', signature);
  
  return { signature, timestamp };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryCodes = searchParams.get('countryCodes');
    
    if (!countryCodes) {
      return NextResponse.json(
        { error: 'countryCodes parameter is required' }, 
        { status: 400 }
      );
    }

    const { signature, timestamp } = generateSignature();
    
    const headers = {
      'Api-key': API_KEY,
      'X-Signature': signature,
      'Accept': 'application/json',
    };

    const url = `${ENDPOINT}/hotel-content-api/1.0/locations/destinations?fields=all&countryCodes=${countryCodes}&language=ENG&from=1&to=100&useSecondaryLanguage=false`;
    
    console.log('Making request to:', url);
    console.log('Headers:', { ...headers, 'X-Signature': '***' });
    console.log('Timestamp:', timestamp);
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations', details: error.message }, 
      { status: 500 }
    );
  }
}
