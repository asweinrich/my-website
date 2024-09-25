
export default function Header() {
  return (

      <header className="flex flex-row p-6">
        <div className="flex flex-col w-full">
          <a href="/"><h1 className="uppercase italic text-3xl leading-none font-bold mb-2">Weinrich.xyz</h1></a>

          <div className="space-x-4 text-2xl uppercase px-1">
            <a href=""><span className="text-cyan-300 hover:text-cyan-400">Life</span></a>
            <a href=""><span className="text-red-300 hover:text-red-400">Media</span></a>
            <a href="/music"><span className="text-indigo-300 hover:text-indigo-400">Music</span></a>
            <a href="/piper"><span className="text-purple-300 hover:text-purple-400">Piper</span></a>

          </div>
        </div>

      </header>
      
  );
}
