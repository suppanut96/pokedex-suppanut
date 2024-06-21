import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { LuUser } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import axios from 'axios';


const Header = ({orderedProducts, onSearchResults}) => {
  const navigate = useNavigate();
  const uniqueProductCount = orderedProducts.length;
  const [input, setInput] = useState("");

  const handleSearch = async (e) => {
    if(e.key === "Enter"){
      if (input.length > 0) {
        try {
          var apiPath = `https://pokeapi.co/api/v2/pokemon/${e.target.value.toLowerCase()}`;
          console.log(e.target.value.toLowerCase());
          console.log(apiPath);
          const response = await axios.get(apiPath);
          onSearchResults([response.data]); // Pass the results to the parent component
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
          onSearchResults([]); // Clear results if there's an error
        }
      } else {
        onSearchResults([]); // Clear results if input is empty
      }
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <span>Welcome to Pokemon shop!</span>
        <div className="header-info">
          <div className="header-nav-titleLeft">
            <CiLocationOn className="header-contact-icon" />
            <span> Contact 123456</span>
            <span>|</span>
            <TbTruckDelivery className="header-track-icon" />
            <span>Track your order</span>
            <span>|</span>
            <CiDiscount1 className="header-offer-icon" />
            <span>All Offers</span>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-logo" onClick={() => navigate('/')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon" />
        </div>
        <div className="header-search">
          <FaSearch className="header-search-icon" />
          <input 
            placeholder="Search name Pokémon ..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <div className="header-nav">
          <div className="header-nav-item">
            <LuUser className="header-user-icon" />
            <span>Username</span>
          </div>
          <span>|</span>
          <div className="header-nav-item" onClick={() => navigate('/pokeball')}>
            <IoBagOutline className="header-shop-icon" />
            <span>Pocket</span>
            <div className="cart-count">{uniqueProductCount}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
