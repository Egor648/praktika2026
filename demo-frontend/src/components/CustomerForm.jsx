import React, { useState, useEffect } from 'react';
import { Button } from '@consta/uikit/Button';
import { customerAPI } from '../services/api';

function CustomerForm({ customer, onClose }) {
  const [formData, setFormData] = useState({
    customerCode: '',
    customerName: '',
    customerInn: '',
    customerKpp: '',
    customerLegalAddress: '',
    customerPostalAddress: '',
    customerEmail: '',
    isOrganization: false,
    isPerson: false
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (customer) {
        await customerAPI.update(customer.customerCode, formData);
      } else {
        await customerAPI.create(formData);
      }
      onClose();
    } catch (error) {
      alert('Ошибка сохранения');
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{customer ? 'Редактировать' : 'Добавить'} контрагента</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Код контрагента *</label>
            <input
              name="customerCode"
              value={formData.customerCode}
              onChange={handleChange}
              disabled={!!customer}
              required
            />
          </div>

          <div className="form-group">
            <label>Название *</label>
            <input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>ИНН</label>
            <input
              name="customerInn"
              value={formData.customerInn}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>КПП</label>
            <input
              name="customerKpp"
              value={formData.customerKpp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Юридический адрес</label>
            <input
              name="customerLegalAddress"
              value={formData.customerLegalAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Почтовый адрес</label>
            <input
              name="customerPostalAddress"
              value={formData.customerPostalAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isOrganization"
                checked={formData.isOrganization}
                onChange={handleChange}
              />
              {' '}Юридическое лицо
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isPerson"
                checked={formData.isPerson}
                onChange={handleChange}
              />
              {' '}Физическое лицо
            </label>
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

export default CustomerForm;