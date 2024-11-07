import React, { useState } from 'react';
import './ProductPage.css';

function ProductPage() {
  const [activeTab, setActiveTab] = useState('add');
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const apiBaseUrl = 'https://pushapp-backend.cloud-stacks.com/api/products';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormState({
      id: '',
      name: '',
      description: '',
      price: '',
      quantity: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { id, name, description, price, quantity } = formState;
    try {
      if (activeTab === 'add') {
        const response = await fetch(apiBaseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, price, stock: quantity }),
        });
        if (!response.ok) throw new Error('Failed to add product');
      } else if (activeTab === 'update') {
        const response = await fetch(`${apiBaseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, price, stock: quantity }),
        });
        if (!response.ok) throw new Error('Failed to update product');
      } else if (activeTab === 'remove') {
        const response = await fetch(`${apiBaseUrl}/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to remove product');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="product-page">
      <header className="header">
        <h1>Product Catalog Management</h1>
      </header>
      <div className="main-content">
        <nav className="navigation-pane">
          <ul>
            <li onClick={() => handleTabChange('add')}>Add New Product</li>
            <li onClick={() => handleTabChange('update')}>Update Product</li>
            <li onClick={() => handleTabChange('remove')}>Remove Product</li>
          </ul>
          <div className="additional-links"></div>
        </nav>
        <div className="content-area">
          <form className="product-form">
            {activeTab !== 'add' && (
              <input
                type="text"
                name="id"
                placeholder="Product ID"
                value={formState.id}
                onChange={handleInputChange}
              />
            )}
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formState.name}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formState.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={formState.price}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Product Quantity"
              value={formState.quantity}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleSubmit} className="primary-btn">
              {activeTab === 'add' ? 'Add Product' : activeTab === 'update' ? 'Update Product' : 'Remove Product'}
            </button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>© 2023 Your Company Name</p>
      </footer>
    </div>
  );
}

export default ProductPage;
