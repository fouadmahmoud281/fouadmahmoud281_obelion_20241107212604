import React, { useState } from 'react';
import './SearchComponent.css';

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    fetchSuggestions(searchQuery);
  };

  const fetchSuggestions = async (searchQuery) => {
    try {
      const response = await fetch('https://pushapp-backend.cloud-stacks.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('https://pushapp-backend.cloud-stacks.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      onSearch(data.result);
      setSuggestions([]);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <div className="search-component">
      <header className="header">
        <div className="logo">Company Logo</div>
        <nav className="navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <div className="search-bar-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#terms">Terms & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#help">Help Center</a>
          <a href="#sitemap">Site Map</a>
        </div>
        <div className="social-media">
          <span>© 2023 Company</span>
        </div>
      </footer>
    </div>
  );
};

export default SearchComponent;
