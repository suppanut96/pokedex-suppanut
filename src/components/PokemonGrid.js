
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdGridView } from "react-icons/md";
import { TbLayoutList } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import './PokemonGrid.css';
import { LuSearchX } from "react-icons/lu";

const PokemonGrid = ({searchResults}) => {
  const [pokemon, setPokemon] = useState([]);
  const [view, setView] = useState('grid');
  const navigate = useNavigate();
  const [searchQuery] = useState('');
  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=12');
        const results = response.data.results;

        // Fetch details for each Pokemon
        const detailedPromises = results.map((poke) => axios.get(poke.url));
        const detailedResponses = await Promise.all(detailedPromises);
        const detailedData = detailedResponses.map((res) => res.data);

        setPokemon(detailedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
  }, []);
  
  const displayedPokemon = searchResults.length > 0 ? searchResults : pokemon;

  return (
    <div>
      <div className="header-container">
        <h2 className="products-label">Products ({displayedPokemon.length})</h2>
        <div className="view-switcher">
            <MdGridView
                className={`view-icon ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
            />
            <TbLayoutList
                className={`view-icon ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
            />
        </div>
      </div>
      <div className={`pokemon-container ${view}`}>
      {displayedPokemon.length === 0 && searchQuery.length > 0 ? (
      <div className="not-found">
        <LuSearchX className="not-found-icon" />
        <p>Oops! Nothing was found for “ {searchQuery} ”<br />Please try to search for something else.</p>
      </div>
      ) : (
        displayedPokemon.map((poke) => (
          <div key={poke.id} className={`pokemon-card ${view}`}>
            <div className="pokemon-image">
                <img src={poke.sprites.other["official-artwork"].front_default} alt={poke.name} />
            </div>
            <div className={`pokemon-info ${view}`}>
              <div className={`pokemon-nameType ${view}`}>
                <h2>{poke.name}</h2>
                <div className="pokemon-types">
                  {poke.types.map((type) => (
                      <span key={type.type.name} className={`type-label ${type.type.name}`}>
                      {type.type.name}
                      </span>
                  ))}
                </div>
              </div>
                {view === 'list' && (
                  <div className="pokemon-abilities">
                    <p>Abilities: {poke.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                  </div>
                )}
            </div>
            {view === 'grid' && (
              <div className="detail-button-container">
                  <button className="detail-button" onClick={() => navigate(`/pokemon/${poke.id}`)}>Detail</button>
              </div>
            )}
          </div>
        )))}
    </div>
    </div>
  );
};

export default PokemonGrid;
