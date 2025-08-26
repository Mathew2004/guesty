import { NextResponse } from 'next/server';

// Since Guesty doesn't have separate destinations, 
// this endpoint will return cities filtered by country
const GUESTY_API_BASE = 'https://booking.guesty.com/api';
const GUESTY_TOKEN = 'eyJraWQiOiJSZVNOdEhOdkM5MXR3bWlVdTZYNC15amVUb01ORi1neEtlUnFtcXQzR3JBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkduOUxFV0FMdWRjbHNnODRYUGVQSE1Rbld6bGVGMGpHa2dHdDZQV3BsRzQiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3NTYxNDc5NDcsImV4cCI6MTc1NjIzNDM0NywiY2lkIjoiMG9hb2wwamd2N3hicHZ1c2I1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FvbDBqZ3Y3eGJwdnVzYjVkNyIsImFjY291bnRJZCI6IjY3ZWVmY2RiYzhiNTJkODM0ZGNiOGVlYyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hb2wwamd2N3hicHV1c2I1ZDcifQ.NPHsHvqAy-s_gW7YwQY3wtnShuej53oBRN2G8YDRyOIFnU9Zgf1xodKRVcrSSU9Zg65NIR6wR5QkDPoeVqj53PwjQVtw8mIdiNw6f07a0InoxgW1_SHE_4VMmylp9mh1dH0vOJqNIPujKLLZX2j5S25TiBGwDAA_5tBAIoKSQvsWIWf534TuOrh3bZzb_uqoYPTNU-1kCbb_35aioAazpFRlvNTASltXw6EFPyDtjpJPH41BqeKgaytxyeqxNEV6gpu5NWTsBI9KdO9383BRq1ASgss8UeVSo0QEn7Wx69I9LpznR2F42VaTCbxDDEczo8-BjuKZoISWRYuRMTIjLQ';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    
    if (!country) {
      return NextResponse.json(
        { error: 'country parameter is required' }, 
        { status: 400 }
      );
    }

    const headers = {
      'accept': 'application/json; charset=utf-8',
      'authorization': `Bearer ${GUESTY_TOKEN}`,
    };

    // For Guesty API, we'll fetch all cities and filter by country
    const url = `${GUESTY_API_BASE}/listings/cities?limit=100`;
    
    console.log('Fetching cities for country from Guesty API:', url);
    console.log('Filtering by country:', country);
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    console.log('Cities by country API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cities by country API Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    console.log('Cities by country API Response data:', data);
    
    // Transform cities to look like destinations and filter by country
    const cities = data.results || data || [];
    const destinations = cities
      .filter(city => city.country && city.country.toLowerCase().includes(country.toLowerCase()))
      .map(city => ({
        code: `${city.city.replace(/\s+/g, '_').toUpperCase()}_${(city.state || 'STATE').replace(/\s+/g, '_').toUpperCase()}`,
        name: { content: city.city },
        city: city.city,
        state: city.state || '',
        country: city.country,
        countryCode: city.country.replace(/\s+/g, '').toUpperCase().slice(0, 2)
      }));
    
    return NextResponse.json({
      destinations: destinations,
      total: destinations.length
    });
  } catch (error) {
    console.error('Cities by country API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cities for country', details: error.message }, 
      { status: 500 }
    );
  }
}
