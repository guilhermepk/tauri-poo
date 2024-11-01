import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import axios from 'axios';

const apiJoao = axios.create({
  baseURL: 'http://localhost:8080',
});

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [teste, setTeste] = useState<string | null>(null);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  async function criaProduto(){
    const body = {
      "codigo": 1,
      "descricao": "Minha descrição",
      "preco": 12.1,
      "nome": "Diogo"
    }

    const response = await apiJoao.post('api/v1/produtos', body);
    console.log(response)
    setTeste(response.data.nome as string);
  }

  return (
    <main className="container">
      <button onClick={() => criaProduto()}> Teste </button>
      {teste && (
        <p> {teste} </p>
      )}
      {/* <h1>Welcome to Tauri + React</h1>
      <h1>Prigol eh bão</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p> */}
    </main>
  );
}

export default App;
