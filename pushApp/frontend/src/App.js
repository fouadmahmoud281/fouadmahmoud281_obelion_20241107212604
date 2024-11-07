import React from 'react';
import LoginComponent from './components/LoginComponent/LoginComponent.js';
import ProductManagement from './components/ProductManagement/ProductManagement.js';
import SearchComponent from './components/SearchComponent/SearchComponent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <LoginComponent />
        <SearchComponent />
        <ProductManagement />
      </main>
      <footer>
        <p>© 2023 My React App</p>
      </footer>
    </div>
  );
}

export default App;
