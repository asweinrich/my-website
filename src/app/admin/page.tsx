"use client"

import { useState } from 'react';
import Header from "../components/Header.jsx";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/get-tracks`);
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
            <button type="submit">Get Top Tracks</button>
          </form>

          {results && (
            <div>
              <h2>Results:</h2>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>

      </main>
      
    </div>
  );
}

