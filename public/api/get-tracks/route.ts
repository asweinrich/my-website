import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  
  try {
    // Fetch the access token from the token route
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/spotify-token`, {
      method: 'POST',
    });
    const { access_token } = await tokenResponse.json();

    // Perform the search
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return NextResponse.json(searchResponse.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search Spotify' }, { status: 500 });
  }
}
