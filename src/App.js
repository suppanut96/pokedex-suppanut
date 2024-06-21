import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonGrid from './components/PokemonGrid';
import PokemonDetail from './components/PokemonDetail';
import Header from './components/Header';
import Pokeball from './components/Pokeball';

const App = () => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [searchResults,setSearchResults] = useState([]);
  

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const addToOrder = (product) => {
    setOrderedProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
        );
      }
      return [...prevProducts, product];
    });
  };

  return (
    <Router>
      <Header orderedProducts={orderedProducts} onSearchResults={handleSearchResults}/>
      <Routes>
        <Route path="/" element={<PokemonGrid searchResults={searchResults}/>} />
        <Route path="/pokemon/:id" element={<PokemonDetail addToOrder={addToOrder}/>} />
        <Route path="/pokeball" element={<Pokeball orderedProducts={orderedProducts} setOrderedProducts={setOrderedProducts} />} />
      </Routes>
    </Router>
  );
};

export default App;
