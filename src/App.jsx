import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";

function App() {

    const [pokemonTwenty, setPokemonTwenty] = useState([]);

    async function fetchPokemon() {
         try {
         const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
         setPokemonTwenty(result.data.results);
         } catch (e) {
           console.error(e);
         } finally {
         }
    }
    useEffect(() => {
     fetchPokemon();
     }, []);
console.log(pokemonTwenty);
    if (!pokemonTwenty[0]) {
        return (
            <div>
                <p>Loading ...</p>
            </div>
        )
    }

    return (
        <>
            <h1>Gotta catch em all!</h1>
            {pokemonTwenty && <PokemonCard pokemonData={pokemonTwenty} />}
            {pokemonTwenty?.map((name, index) => {
                return (
                <div key={name.url}>
                <p>{name.name}</p>
                <p>{name.url}</p>
                </div>
            );
            })}
        </>
    )
}

export default App
