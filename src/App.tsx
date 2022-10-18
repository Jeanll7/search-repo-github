import { useEffect, useState } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";

interface Repo {
  name: string;
  description: string;
}

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  // const [filteredRepos, setFilteredRepos] = useState<Repo[]>([])
  const [search, setSearch] = useState("");

  console.log("Renderizou");

  useEffect(() => {
    fetch("https://api.github.com/users/Jeanll7/repos")
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  const filteredRepos =
    search.length > 0 ? repos.filter((repo) => repo.name.includes(search)) : [];

  // useEffect(() => {
  //   if (search.length) {
  //     setFilteredRepos(repos.filter(repo => repo.name.includes(search)));
  //   }
  // }, [search])

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-3xl font-bold my-4">RepoGit</h1>
      <input
        className="rounded-md p-1 mb-4 text-teal-900 font-semibold tracking-wider"
        name="search"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <ul>
          {filteredRepos.map((repo) => {
            return <li key={repo.name}>{repo.name}</li>;
          })}
        </ul>
      ) : (
        <ul>
          {repos.map((repo) => {
            return <li key={repo.name}>{repo.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
