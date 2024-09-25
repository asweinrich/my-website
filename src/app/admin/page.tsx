"use client"

import { useState, useEffect } from 'react';
import Header from "../components/Header.jsx";

export default function Home() {

  const [topTracks, setTopTracks] = useState(null);

  const handleLogin = () => {
    window.location.href = '/api/spotify/login';
  };

  const fetchTopTracks = async (accessToken: string) => {
    const response = await fetch(`/api/spotify/top-tracks?access_token=${accessToken}`);
    const data = await response.json();
    setTopTracks(data);
  };

  const handleCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    if (accessToken) {
      fetchTopTracks(accessToken);
    }
  };

  // Call this when the page loads
  useEffect(() => {
    handleCallback();
  }, []);



  return (
    <div className="flex flex-col font-[family-name:var(--font-werdna)]">

      <Header />
      
      
      <main className="flex flex-row h-screen relative justify-start px-8">
        <div className="flex flex-col">
          <span className="text-yellow-300">ADMIN</span>
       
          <button onClick={handleLogin}>Log in with Spotify</button>

          {topTracks && (
            <div>
              <h2>Top Tracks:</h2>
              <ul>
                {topTracks.map((track: any) => (
                  <li key={track.id}>
                    {track.name} by {track.artists.map((artist: any) => artist.name).join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </main>
      
    </div>
  );
}

