import React, { useState, useEffect } from 'react';
import { Button } from '@consta/uikit/Button';
import { lotAPI, customerAPI } from '../services/api';

function LotForm({ lot, onClose }) {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    lotName: '',
    customerCode: '',
    price: '',
    currencyCode: 'RUB',
    ndsRate: 'Без НДС',
    placeDelivery: '',
    dateDelivery: ''
  });

  useEffect(() => {
    loadCustomers();
    if (lot) {
      const lotData = { ...lot };
      if (lotData.dateDelivery) {
        lotData.dateDelivery = new Date(lotData.dateDelivery).toISOString().slice(0, 16);
      }
      setFormData(lotData);
    }
  }, [lot]);

  const loadCustomers = async () => {
    try {
      const response = await customerAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error('Ошибка загрузки контрагентов');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };
      if (submitData.dateDelivery) {
        submitData.dateDelivery = new Date(submitData.dateDelivery).toISOString();
      }
      
      if (lot) {
        await lotAPI.update(lot.lotId, submitData);
      } else {
        await lotAPI.create(submitData);
      }
      onClose();
    } catch (error) {
      alert('Ошибка сохранения');
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{lot ? 'Редактировать' : 'Добавить'} лот</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название лота *</label>
            <input
              name="lotName"
              value={formData.lotName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Контрагент *</label>
            <select
              name="customerCode"
              value={formData.customerCode}
              onChange={handleChange}
              required
            >
              <option value="">Выберите контрагента</option>
              {customers.map(c => (
                <option key={c.customerCode} value={c.customerCode}>
                  {c.customerCode} - {c.customerName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Цена</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Валюта</label>
            <select name="currencyCode" value={formData.currencyCode} onChange={handleChange}>
              <option value="RUB">RUB</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ставка НДС</label>
            <select name="ndsRate" value={formData.ndsRate} onChange={handleChange}>
              <option value="Без НДС">Без НДС</option>
              <option value="18%">18%</option>
              <option value="20%">20%</option>
            </select>
          </div>

          <div className="form-group">
            <label>Место доставки</label>
            <input
              name="placeDelivery"
              value={formData.placeDelivery}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Дата доставки</label>
            <input
              type="datetime-local"
              name="dateDelivery"
              value={formData.dateDelivery}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Button view="ghost" label="Отмена" onClick={onClose} />
            <Button type="submit" label="Сохранить" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LotForm;