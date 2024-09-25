import { NextResponse } from 'next/server';
import querystring from 'querystring';

export async function GET() {
  const scope = 'user-top-read'; // Scope for accessing top tracks

  const params = querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params}`;

  return NextResponse.redirect(spotifyAuthUrl);
}
