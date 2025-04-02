import './PokemonCard.css';
import axios from "axios";
import {useEffect, useState} from "react";

function PokemonCard({pokemonData}) {
    const [pokemon, setPokemon] = useState({});
        console.log(`Dit is het resultaat van de selectie van 20: `, pokemonData);

    async function fetchPokemonData() {
    try {
        const result = await axios.get(pokemonData);
        setPokemon(result.data);
    } catch (e) {
        console.error(e);
    } finally {

    }
}
useEffect(() => {
    fetchPokemonData();
}, []);

    if (!pokemon.id) {
        return (
            <div>
                <p>Loading ...</p>
            </div>
        )
    }

return (
    <div>

        <h2>{pokemon.id}. {pokemon.name}</h2>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}  alt={pokemon.name}/>
        <p>Moves: {pokemon.moves?.length || 0}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Abilities:</p>
        {pokemon.abilities?.map((ability, index) => (
            <p key={index}>{ability.ability.name}</p>))}
    </div>
)
}

export default PokemonCard;


