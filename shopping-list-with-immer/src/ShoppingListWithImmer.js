import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import './ShoppingListWithImmer.css';

const ShoppingList = () => {

  const [shoppingList, updateShoppingList] = useImmer([
    { id: 1, name: 'Soda', quantity: 1, details: { category: 'Drink', notes: 'Sweet and Refreshing taste!' } },
    { id: 2, name: 'Coffee', quantity: 5, details: { category: 'Drink', notes: 'Bitter taste of Caffeine' } },
    { id: 3, name: 'Cereal', quantity: 3, details: { category: 'Food', notes: 'Energizing breakfast!' } },
    { id: 4, name: 'Cake', quantity: 1, details: { category: 'Dessert', notes: 'Delightfully sweet!' } },

  ]);

  // State for storing the new item's details while the user fills them in
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: '',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addItemToList = () => {
    if (!newItem.name || !newItem.quantity || !newItem.category) {
      alert('Please make sure all required fields are filled out.');
      return;
    }

    updateShoppingList((draft) => {
      const itemToAdd = {
        id: Date.now(), // Create's unique id with current timestamp
        name: newItem.name,
        quantity: parseInt(newItem.quantity, 10), // Convert quantity to an integer
        details: {
          category: newItem.category,
          notes: newItem.notes,
        },
      };
      draft.push(itemToAdd); 
    });

    // Resets form
    setNewItem({
      name: '',
      quantity: '',
      category: '',
      notes: '',
    });
  };

  const increaseItemQuantity = (id) => {
    updateShoppingList((draft) => {
      const item = draft.find((item) => item.id === id);
      if (item) {
        item.quantity += 1; 
      }
    });
  };

  const removeItemFromList = (id) => {
    updateShoppingList((draft) => {
      const index = draft.findIndex((item) => item.id === id);
      if (index !== -1) {
        draft.splice(index, 1); 
      }
    });
  };

  return (
    <div>
      <h1>Your Shopping List</h1>
      <div>
        <h2>Add a New Item</h2>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Add notes..."
          value={newItem.notes}
          onChange={handleInputChange}
        />
        <button onClick={addItemToList}>Add Item</button>
      </div>

      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - Quantity: {item.quantity}
            <br />
            Category: {item.details.category}, Notes: {item.details.notes}
            <br />
            <button onClick={() => increaseItemQuantity(item.id)}>Increase Quantity</button>
            <button onClick={() => removeItemFromList(item.id)}>Remove Item</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
