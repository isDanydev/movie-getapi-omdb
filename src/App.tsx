import { useState } from "react";
import { Search } from "./data/types/search.ts";

const App = () => {
  const [dataDb, setDataDb] = useState<Search[]>([]);
  const [search, setSearch] = useState<string>("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSearch = async () => {
    const response = await fetch(`${apiUrl}?s=${search}&apikey=${apiKey}`);
    const data = await response.json();
    setDataDb(data.Search || []);
    console.log(data.Search);
  };

  return (
    <div className="max-w-[1280px] m-auto bg-slate-800 flex flex-col gap-2">
      <div className="flex justify-between p-2 items-center bg-slate-700">
        <a
          href="/"
          className="rounded bg-slate-400 border-solid border-4 border-slate-400"
        >
          <h1 className="uppercase bg-slate-700 text-slate-200 font-bold p-2 ">
            Omdb - Api
          </h1>
        </a>
        <div className=" bg-slate-400 p-2 rounded">
          <input
            type="search"
            name="search"
            placeholder="Buscar..."
            className="rounded px-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="text-slate-200 bg-slate-700 px-2 rounded font-bold uppercase"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {dataDb === null || dataDb.length === 0 ? (
        <div className="flex justify-center items-center flex-col ">
          <img
            src="../src/assets/image_861208160318218987734.gif"
            alt="loading"
            className="rounded"
          />
          <h2 className="text-center text-white">
            No se encontraron resultados
          </h2>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 m-2">
          {dataDb.map((data) => (
            <div
              key={data.imdbID}
              className="flex flex-col justify-center bg-slate-700 max-w-[250px] p-2 rounded"
            >
              <div className="m-auto text-center">
                <h2 className="capitalize text-white">{data.Title}</h2>
              </div>
              <div className="w-full h-[85%] bg-black flex items-center justify-center p-2 rounded">
                <img
                  className="object-cover object-center h-full w-full rounded"
                  src={data.Poster}
                  alt={`poster-${data.Title}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <footer className="flex justify-center p-2 items-center bg-slate-700">
        <p className="uppercase text-slate-400 font-bold">
          &copy; 2024 Danydev. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};
export default App;
