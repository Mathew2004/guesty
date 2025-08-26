import { NextResponse } from 'next/server';

const GUESTY_API_BASE = 'https://booking.guesty.com/api';
const GUESTY_TOKEN = 'eyJraWQiOiJSZVNOdEhOdkM5MXR3bWlVdTZYNC15amVUb01ORi1neEtlUnFtcXQzR3JBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkduOUxFV0FMdWRjbHNnODRYUGVQSE1Rbld6bGVGMGpHa2dHdDZQV3BsRzQiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE3NTYxNDc5NDcsImV4cCI6MTc1NjIzNDM0NywiY2lkIjoiMG9hb2wwamd2N3hicHZ1c2I1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2FvbDBqZ3Y3eGJwdnVzYjVkNyIsImFjY291bnRJZCI6IjY3ZWVmY2RiYzhiNTJkODM0ZGNiOGVlYyIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImNsaWVudFR5cGUiOiJib29raW5nIiwiaWFtIjoidjMiLCJhcHBsaWNhdGlvbklkIjoiMG9hb2wwamd2N3hicHZ1c2I1ZDcifQ.NPHsHvqAy-s_gW7YwQY3wtnShuej53oBRN2G8YDRyOIFnU9Zgf1xodKRVcrSSU9Zg65NIR6wR5QkDPoeVqj53PwjQVtw8mIdiNw6f07a0InoxgW1_SHE_4VMmylp9mh1dH0vOJqNIPujKLLZX2j5S25TiBGwDAA_5tBAIoKSQvsWIWf534TuOrh3bZzb_uqoYPTNU-1kCbb_35aioAazpFRlvNTASltXw6EFPyDtjpJPH41BqeKgaytxyeqxNEV6gpu5NWTsBI9KdO9383BRq1ASgss8UeVSo0QEn7Wx69I9LpznR2F42VaTCbxDDEczo8-BjuKZoISWRYuRMTIjLQ';

export async function GET() {
  try {
    // Test Guesty API connectivity
    console.log('=== Testing Guesty API Connectivity ===');
    
    const headers = {
      'accept': 'application/json; charset=utf-8',
      'authorization': `Bearer ${GUESTY_TOKEN}`,
    };

    // Try the simplest endpoint first - get a few cities
    const url = `${GUESTY_API_BASE}/listings/cities?limit=5`;
    
    console.log('Request URL:', url);
    console.log('Request Headers:');
    console.log('- accept: application/json; charset=utf-8');
    console.log('- authorization: Bearer [TOKEN]');
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
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
        error: 'Guesty API request failed',
        details: {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseBody,
          requestInfo: {
            url,
            hasToken: !!GUESTY_TOKEN
          }
        }
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Guesty API connection successful',
      data: responseBody,
      requestInfo: {
        url,
        dataCount: Array.isArray(responseBody) ? responseBody.length : 'N/A'
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
