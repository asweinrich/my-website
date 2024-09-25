"use client"

import { useState } from 'react';
import Header from "../components/Header.jsx";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/spotify-search?query=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    
    setResults(data);
  };



  return (
    <div className="flex flex-col font-[family-name:var(--font-werdna)]">

      <Header />
      
      
      <main className="flex flex-row h-screen relative justify-start px-8">
        <div className="flex flex-col">
          <span className="text-yellow-300">ADMIN</span>
       
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Spotify..."
            />
            <button type="submit">Search</button>
          </form>

          {results && (
            <div>
              <h2>Search Results:</h2>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>

      </main>
      
    </div>
  );
}

