import { NextResponse } from 'next/server';
import { getGuestyToken } from '../../../lib/auth.js';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!listingId || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters: listingId, from, to' },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(from) || !dateRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD format' },
        { status: 400 }
      );
    }

    // Get fresh token
    const token = await getGuestyToken();

    const url = `${GUESTY_API_BASE}/listings/${listingId}/calendar?from=${from}&to=${to}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Guesty calendar API error:', response.status, errorText);
      
      return NextResponse.json(
        { error: `Failed to fetch calendar data: ${response.status}` },
        { status: response.status }
      );
    }

    const calendar = await response.json();
    
    // Transform the calendar data to ensure consistent structure
    const transformedCalendar = calendar.map(day => ({
      date: day.date,
      minNights: day.minNights || 1,
      isBaseMinNights: day.isBaseMinNights || false,
      status: day.status, // 'available' or 'unavailable'
      cta: day.cta || false, // Check-in allowed
      ctd: day.ctd || false, // Check-out allowed
      available: day.status === 'available'
    }));

    console.log(`Calendar fetched for listing ${listingId}: ${transformedCalendar.length} days`);
    
    return NextResponse.json(transformedCalendar);
    
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar data', details: error.message },
      { status: 500 }
    );
  }
}
