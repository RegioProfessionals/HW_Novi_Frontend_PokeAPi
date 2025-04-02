import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";

function App() {

    const [pokemonTwenty, setPokemonTwenty] = useState([]);
    const [counterTwenty, setCounterTwenty] = useState(0);

    async function fetchPokemon() {
        try {
            let result;
            if (counterTwenty <= 20) {
                result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
            } else if (counterTwenty <= 1280) {
                result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${counterTwenty}`);
            } else if (counterTwenty >= 1300) {
                result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2&offset=1300`);
            }
            setPokemonTwenty(result.data.results);
        } catch (e) {
            console.error(e);
        } finally {
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [counterTwenty]);
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
            {counterTwenty <= 20 ? (
                <button type="button" disabled={true} onClick={() => {
                    setCounterTwenty(prev => prev - 20);
                    fetchPokemon();
                }}>Vorige 20
                </button>
            ) : (
                <button type="button" onClick={() => {
                    setCounterTwenty(prev => prev - 20)
                    fetchPokemon();
                }}>Vorige 20
                </button>
            )}

            {counterTwenty <= 1299 ? (
                <button type="button" onClick={() => {
                    setCounterTwenty(prev => prev + 20);
                    fetchPokemon();
                }}>Volgende 20
                </button>
            ) : (<span></span>

            )}


            {counterTwenty >= 1301 ? (
                <button type="button" disabled={true} onClick={() => {
                    setCounterTwenty(prev => prev + 2);
                    fetchPokemon();

                }}>Laatste
                </button>
            ) : (
                <span></span>
            )}

            {counterTwenty === 1300 ? (
                <button type="button" onClick={() => {
                    setCounterTwenty(prev => prev + 2);
                    fetchPokemon();

                }}>Laatste 2
                </button>
            ) : (
                <span></span>
            )}

            {counterTwenty === 1302 ? (
                    setCounterTwenty(prev => prev + 18)
            ) : (
                <span></span>
            )}



            <p>Huidige teller: {counterTwenty}</p>

            {
                pokemonTwenty?.map((name, index) => {
                    return (
                        <div key={name.url}>
                            <PokemonCard pokemonData={name.url}/>}

                        </div>
                    );
                })
            }
        </>
    )
}

export default App
