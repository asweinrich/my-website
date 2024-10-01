import { NextResponse } from 'next/server';
import axios from 'axios';
import querystring from 'querystring';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code'); // Get the authorization code from the query params

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const body = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI, // Ensure this is correctly set in .env.local
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  });

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;

    return NextResponse.json({ access_token, refresh_token });
  } catch (error) {
    console.error('Failed to exchange authorization code for tokens', error);
    return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 500 });
  }
}
