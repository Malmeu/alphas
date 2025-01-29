'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const contactInfo = [
  {
    name: 'Email',
    description: 'Notre équipe vous répondra dans les plus brefs délais',
    email: 'contact@alphas-pompes.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'Téléphone',
    description: 'Du Dimanche au Jeudi de 8h à 17h',
    phone: '+213 (0) 23 53 82 10',
    fax: '+213 (0) 23 53 82 11',
    icon: PhoneIcon,
  },
  {
    name: 'Adresse',
    description: 'Venez nous rendre visite',
    address: 'Zone Industrielle de Oued Smar, Lot N° 55, Alger, Algérie',
    icon: MapPinIcon,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contactez-nous
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative bg-white">
        {/* Décoration */}
        <div className="absolute left-0 right-0 h-48 -mt-24 bg-primary skew-y-6 transform origin-top-left"></div>
        <div className="absolute left-0 right-0 h-48 -mt-24 bg-primary/30 skew-y-3 transform origin-top-right"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Cartes d'information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-8 mb-16">
            {contactInfo.map((item) => (
              <div
                key={item.name}
                className="relative bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                      <item.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{item.description}</p>
                    {item.email && (
                      <a href={`mailto:${item.email}`} className="mt-3 block text-primary hover:text-primary-dark">
                        {item.email}
                      </a>
                    )}
                    {item.phone && (
                      <div className="mt-3">
                        <a href={`tel:${item.phone}`} className="block text-primary hover:text-primary-dark">
                          {item.phone}
                        </a>
                        {item.fax && <p className="mt-1 text-gray-500">Fax: {item.fax}</p>}
                      </div>
                    )}
                    {item.address && (
                      <p className="mt-3 text-gray-700">{item.address}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire de contact */}
          <div className="max-w-3xl mx-auto pb-24">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Entreprise
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <div className="mt-1">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="support">Support technique</option>
                      <option value="commercial">Question commerciale</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="h-[400px] w-full bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.2107635073776!2d3.1821416!3d36.7234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQzJzI0LjQiTiAzwrAxMCc1NS43IkU!5e0!3m2!1sfr!2sdz!4v1625581234567!5m2!1sfr!2sdz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
