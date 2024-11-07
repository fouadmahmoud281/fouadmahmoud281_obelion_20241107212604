import React, { useState } from 'react';
import './SearchPage.css';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/search', { query: value }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('https://pushapp-backend.cloud-stacks.com/api/search', { query }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  return (
    <div className="search-page">
      <header className="header">
        <div className="logo">Company Logo</div>
        <nav className="nav-tabs">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for products..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        {loading && <div className="loading">Loading...</div>}
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="suggestion-item">{suggestion}</li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#terms">Terms & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#help">Help Center</a>
          <a href="#sitemap">Site Map</a>
        </div>
        <div className="footer-social">
          <span>Follow us:</span>
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
        <div className="footer-copyright">
          &copy; 2023 Company Name
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
