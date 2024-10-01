"use client" 

import { useEffect, useState } from 'react';

export default function Header() {

  const [page, setPage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; 

  useEffect(() => {
    const path = window.location.pathname;
    const pageExtension = path.split('/').pop(); // Get the last part of the URL
    setPage(pageExtension);
  }, []);

  useEffect(() => {
    // Check if the password is already stored in local storage (so user doesn't have to re-enter it)
    const storedPassword = localStorage.getItem('admin-password');
    if (storedPassword === correctPassword) {
      setIsAuthenticated(true);
    }
  }, []);


  return (

      <header className="flex flex-row p-6 overflow-hidden">
        <div className="flex flex-col w-full">
          <a href="/"><h1 className="uppercase italic text-3xl leading-none font-bold mb-2">Weinrich.xyz</h1></a>
          {isAuthenticated && <span className="text-yellow-300 text-2xl font-bold mb-1 px-1">ADMIN</span>}
          <div className="space-x-4 text-2xl uppercase px-1 overflow-hidden">
            <a href=""><span className="text-cyan-300 hover:text-cyan-400">Life</span></a>
            <a href=""><span className="text-red-300 hover:text-red-400">Media</span></a>
            <a href="/music"><span className="text-indigo-300 hover:text-indigo-400" id="music">Music</span></a>
            <a href="/piper"><span className="text-purple-300 hover:text-purple-400">Piper</span></a>
            <a href="/projects"><span className="text-pink-300 hover:text-pink-400">Projects</span></a>
            {isAuthenticated && (
              <>
                <a href="/piper"><span className="text-lime-300 hover:text-lime-400">Family Tree</span></a>
                <a href="/piper"><span className="text-yellow-300 hover:text-yellow-400">Other</span></a>
              </>
            )}
          </div>
        </div>

      </header>
      
  );
}
