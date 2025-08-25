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
  return { signature, timestamp };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const destinationCode = searchParams.get('destinationCode');
    const countryCode = searchParams.get('countryCode');
    const from = searchParams.get('from') || '1';
    const to = searchParams.get('to') || '100';
    const hotelCodes = searchParams.get('hotelCodes') || '';
    
    if (!destinationCode || !countryCode) {
      return NextResponse.json(
        { error: 'destinationCode and countryCode parameters are required' }, 
        { status: 400 }
      );
    }

    const { signature, timestamp } = generateSignature();
    
    const headers = {
      'Api-key': API_KEY,
      'X-Signature': signature,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    let url = `${ENDPOINT}/hotel-content-api/1.0/hotels?fields=all&destinationCode=${destinationCode}&countryCode=${countryCode}&language=ENG&from=${from}&to=${to}&useSecondaryLanguage=false`;
    
    if (hotelCodes) {
      url += `&codes=${hotelCodes}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels' }, 
      { status: 500 }
    );
  }
}
