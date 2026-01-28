import React, { useState, useEffect } from 'react';
import { Button } from '@consta/uikit/Button';
import { lotAPI } from '../services/api';
import LotForm from './LotForm';

function LotList() {
  const [lots, setLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('lotId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingLot, setEditingLot] = useState(null);

  useEffect(() => {
    loadLots();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [lots, filter, sortField, sortOrder]);

  const loadLots = async () => {
    try {
      const response = await lotAPI.getAll();
      setLots(response.data);
    } catch (error) {
      alert('Ошибка загрузки данных');
    }
  };

  const filterAndSort = () => {
    let result = [...lots];
    
    if (filter) {
      result = result.filter(l => 
        l.lotName?.toLowerCase().includes(filter.toLowerCase()) ||
        l.customerCode?.toLowerCase().includes(filter.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      const comparison = aVal.toString().localeCompare(bVal.toString());
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredLots(result);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить лот?')) {
      try {
        await lotAPI.delete(id);
        loadLots();
      } catch (error) {
        alert('Ошибка удаления');
      }
    }
  };

  const handleEdit = (lot) => {
    setEditingLot(lot);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingLot(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingLot(null);
    loadLots();
  };

  return (
    <div>
      <div className="actions">
        <Button label="Добавить лот" onClick={handleAdd} />
      </div>

      <div className="filter-group">
        <input
          type="text"
          placeholder="Поиск по названию, коду контрагента..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('lotId')}>ID {sortField === 'lotId' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('lotName')}>Название {sortField === 'lotName' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('customerCode')}>Контрагент {sortField === 'customerCode' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('price')}>Цена {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Валюта</th>
              <th>НДС</th>
              <th>Место доставки</th>
              <th>Дата доставки</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredLots.map(lot => (
              <tr key={lot.lotId}>
                <td>{lot.lotId}</td>
                <td>{lot.lotName}</td>
                <td>{lot.customerCode}</td>
                <td>{lot.price}</td>
                <td>{lot.currencyCode}</td>
                <td>{lot.ndsRate}</td>
                <td>{lot.placeDelivery}</td>
                <td>{lot.dateDelivery ? new Date(lot.dateDelivery).toLocaleString('ru-RU') : ''}</td>
                <td>
                  <div className="btn-group">
                    <Button size="s" view="secondary" label="Изменить" onClick={() => handleEdit(lot)} />
                    <Button size="s" view="ghost" label="Удалить" onClick={() => handleDelete(lot.lotId)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <LotForm
          lot={editingLot}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default LotList;