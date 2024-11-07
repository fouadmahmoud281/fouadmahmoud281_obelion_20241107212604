import React, { useState } from 'react';
import './ProductManagement.css';
import axios from 'axios';

function ProductManagement() {
  const [activeTab, setActiveTab] = useState('add');
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setProductDetails({
      name: '',
      description: '',
      price: '',
      stock: '',
    });
  };

  const handleSubmit = async () => {
    try {
      if (activeTab === 'add') {
        await axios.post('https://pushapp-backend.cloud-stacks.com/api/products', productDetails, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Product added successfully');
      } else if (activeTab === 'update') {
        const { id } = productDetails;
        await axios.put(`https://pushapp-backend.cloud-stacks.com/api/products/${id}`, productDetails, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Product updated successfully');
      }
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://pushapp-backend.cloud-stacks.com/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Product removed successfully');
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <div className="product-management">
      <header className="header">
        <h1>Product Catalog Management</h1>
      </header>
      <div className="main-container">
        <nav className="navigation-pane">
          <ul>
            <li onClick={() => handleTabChange('add')} className={activeTab === 'add' ? 'active' : ''}>Add New Product</li>
            <li onClick={() => handleTabChange('update')} className={activeTab === 'update' ? 'active' : ''}>Update Product</li>
            <li onClick={() => handleTabChange('remove')} className={activeTab === 'remove' ? 'active' : ''}>Remove Product</li>
          </ul>
          <div className="additional-links">
          </div>
        </nav>
        <div className="content-area">
          {activeTab !== 'remove' && (
            <form>
              <div>
                <label htmlFor="name">Product Name</label>
                <input type="text" id="name" name="name" value={productDetails.name} onChange={handleInputChange} placeholder="Enter product name" />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={productDetails.description} onChange={handleInputChange} placeholder="Enter product description" />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" value={productDetails.price} onChange={handleInputChange} placeholder="Enter product price" />
              </div>
              <div>
                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" value={productDetails.stock} onChange={handleInputChange} placeholder="Enter product stock" />
              </div>
              <button type="button" onClick={handleSubmit} className="primary-action-button">
                {activeTab === 'add' ? 'Add Product' : 'Update Product'}
              </button>
            </form>
          )}
          {activeTab === 'remove' && (
            <div>
              {/* Implement remove product UI */}
              <button onClick={() => handleRemove(productDetails.id)}>Remove Product</button>
            </div>
          )}
        </div>
      </div>
      <footer className="footer">
        © 2023 Your Brand
      </footer>
    </div>
  );
}

export default ProductManagement;
