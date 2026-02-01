"use client";

import { useState, useEffect } from "react";

type ContactFormProps = {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar?: string;
};

export default function ContactForm({ isOpen, onClose, preselectedCar }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState(preselectedCar ?? "");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isOpen) setModel(preselectedCar ?? "");
  }, [isOpen, preselectedCar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Пока никуда не отправляем — только имитация успеха
    setSent(true);
    setName("");
    setPhone("");
    setModel("");
  };

  const handleClose = () => {
    onClose();
    setSent(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Связаться с нами</h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        {sent ? (
          <p className="text-gray-600 py-4">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон *
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="contact-model" className="block text-sm font-medium text-gray-700 mb-1">
                Модель автомобиля
              </label>
              <input
                id="contact-model"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Например: Tracker"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium"
              >
                Отправить
              </button>
              <button type="button" onClick={handleClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
