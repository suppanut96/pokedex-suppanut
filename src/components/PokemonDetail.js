// src/components/PokemonDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoBagOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import './PokemonDetail.css';

const PokemonDetail = ({addToOrder}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleAddToPocket = () => {
    addToOrder({ ...pokemon, quantity });
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-detail-container">
      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <IoIosArrowBack className="back-icon" />
          Back
        </button>
      </div>
      <div className="pokemon-detail-card">
        <div className="pokemon-detail-image">
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        </div>
        <div className="pokemon-detail-info">
            <div className={"pokemon-nameTypeStAb"}>
                <h2>{pokemon.name}</h2>
                <div className="pokemon-types">
                    {pokemon.types.map((type) => (
                    <span key={type.type.name} className={`type-label ${type.type.name}`}>
                        {type.type.name}
                    </span>
                    ))}
                </div>
                <p>Stats: {pokemon.stats.map((stat) => stat.stat.name).join(', ')}</p>
                <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>
        <div className="quantity-control">
        <span>Quantity:</span>
        <div className="quantity-input">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        </div>
        <button className="add-to-pocket-button" onClick={handleAddToPocket}>
            <div className="add-to-pocket-iconText">
            <IoBagOutline className="icon"></IoBagOutline>Add To Pocket</div>
        </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
