import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Search query is missing' }, { status: 400 });
  }

  try {
    // Fetch the access token from the token route
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/spotify-token`, {
      method: 'POST',
    });
    const { access_token } = await tokenResponse.json();

    // Perform the search
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album`,
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
