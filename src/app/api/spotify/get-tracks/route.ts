import { NextResponse } from 'next/server';
import axios from 'axios';

// Handler to get the user's top tracks
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const access_token = searchParams.get('access_token');

  if (!access_token) {
    return NextResponse.json({ error: 'Access token is missing' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        time_range: 'long_term', // long-term listening history
        limit: 15, // Limit to 15 tracks
      },
    });

    const topTracks = response.data.items;
    return NextResponse.json(topTracks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 });
  }
}
