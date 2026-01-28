import React, { useState, useEffect } from 'react';
import { Button } from '@consta/uikit/Button';
import { customerAPI } from '../services/api';
import CustomerForm from './CustomerForm';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('customerCode');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [customers, filter, sortField, sortOrder]);

  const loadCustomers = async () => {
    try {
      const response = await customerAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      alert('Ошибка загрузки данных');
    }
  };

  const filterAndSort = () => {
    let result = [...customers];
    
    if (filter) {
      result = result.filter(c => 
        c.customerCode?.toLowerCase().includes(filter.toLowerCase()) ||
        c.customerName?.toLowerCase().includes(filter.toLowerCase()) ||
        c.customerInn?.toLowerCase().includes(filter.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      const comparison = aVal.toString().localeCompare(bVal.toString());
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredCustomers(result);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm('Удалить контрагента?')) {
      try {
        await customerAPI.delete(code);
        loadCustomers();
      } catch (error) {
        alert('Ошибка удаления');
      }
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCustomer(null);
    loadCustomers();
  };

  return (
    <div>
      <div className="actions">
        <Button label="Добавить контрагента" onClick={handleAdd} />
      </div>

      <div className="filter-group">
        <input
          type="text"
          placeholder="Поиск по коду, названию, ИНН..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('customerCode')}>Код {sortField === 'customerCode' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('customerName')}>Название {sortField === 'customerName' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('customerInn')}>ИНН {sortField === 'customerInn' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Email</th>
              <th>Тип</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.customerCode}>
                <td>{customer.customerCode}</td>
                <td>{customer.customerName}</td>
                <td>{customer.customerInn}</td>
                <td>{customer.customerEmail}</td>
                <td>
                  {customer.isOrganization && 'Юр.лицо'}
                  {customer.isPerson && 'Физ.лицо'}
                </td>
                <td>
                  <div className="btn-group">
                    <Button size="s" view="secondary" label="Изменить" onClick={() => handleEdit(customer)} />
                    <Button size="s" view="ghost" label="Удалить" onClick={() => handleDelete(customer.customerCode)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default CustomerList;