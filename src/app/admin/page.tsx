"use client"

import { useState, useEffect } from 'react';
import Header from "../components/Header.jsx";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
}

export default function Home() {

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; 
  console.log(correctPassword)

  useEffect(() => {
    // Check if the password is already stored in local storage (so user doesn't have to re-enter it)
    const storedPassword = localStorage.getItem('admin-password');
    if (storedPassword === correctPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === correctPassword) {
      // Set authentication state and store password in localStorage for future visits
      setIsAuthenticated(true);
      localStorage.setItem('admin-password', password);
    } else {
      // Show an error message if the password is incorrect
      setError('Incorrect password. Please try again.');
    }
  };

  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const handleLogin = () => {
    window.location.href = '/api/spotify/login';
  };

  const fetchTopTracks = async (accessToken: string) => {
    const response = await fetch(`/api/spotify/get-tracks?access_token=${accessToken}`);
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

  console.log('Redirect URI:', process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI);



  return (
    <div className="flex flex-col font-[family-name:var(--font-werdna)]">

      <Header />

      {!isAuthenticated ? (
        <div className="text-2xl uppercase p-4">
          <h1 className="text-3xl text-center mb-4">Admin Login</h1>
          <form onSubmit={handlePasswordSubmit} className="w-full text-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-950 border-2 rounded-full px-4 block mx-auto mb-6"
            />
            <button type="submit" className="bg-emerald-800 rounded-full px-4 mx-auto mb-4 leading-none text-3xl uppercase py-1 px-8">Submit</button>
          </form>
          {error && <p className="w-full text-center" style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <main className="flex flex-row h-screen relative justify-start px-8">
            <div className="flex flex-col">
           
              <button onClick={handleLogin}>Log in with Spotify</button>

              {topTracks && (
                <div>
                  <h2>Top Tracks:</h2>
                  <ul>
                    {topTracks.map((track: Track) => (
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
      )}
      
      
      
      
    </div>
  );
}

