import React, { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import CustomerList from './components/CustomerList';
import LotList from './components/LotList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="app">
      <div className="header">
        <h1>Система управления закупками</h1>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            Контрагенты
          </button>
          <button 
            className={`tab ${activeTab === 'lots' ? 'active' : ''}`}
            onClick={() => setActiveTab('lots')}
          >
            Лоты
          </button>
        </div>
      </div>
      <div className="container">
        {activeTab === 'customers' ? <CustomerList /> : <LotList />}
      </div>
    </div>
  );
}

export default App;