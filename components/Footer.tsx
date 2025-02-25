'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et Description */}
          <div>
            <div className="relative w-32 h-12">
              <Image
                src="/images/logo-alphas-white.png"
                alt="Logo ALPHAS POMPES"
                fill
                sizes="(max-width: 768px) 100px, 128px"
                className="object-contain"
              />
            </div>
            <p className="text-sm">
              ALPHAS POMPES, votre partenaire de confiance dans le domaine des pompes industrielles depuis plus de 20 ans.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-primary transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/actualite" className="hover:text-primary transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/alphas-service" className="hover:text-primary transition-colors">
                  Nos Services
                </Link>
              </li>
              <li>
                <Link href="/tout-sur-alphas" className="hover:text-primary transition-colors">
                  À Propos de Nous
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Produits */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Nos Produits</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/produits/pompes-centrifuges" className="hover:text-primary transition-colors">
                  Pompes Centrifuges
                </Link>
              </li>
              <li>
                <Link href="/produits/pompes-vide-fut" className="hover:text-primary transition-colors">
                  Pompes Vide-fût
                </Link>
              </li>
              <li>
                <Link href="/produits/stations-d-epuration" className="hover:text-primary transition-colors">
                  Stations d'Épuration
                </Link>
              </li>
              <li>
                <Link href="/produits/station-de-relevage" className="hover:text-primary transition-colors">
                  Stations de Relevage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span>+213 (0) 5 22 98 98 98</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:contact@alphaspompes.ma" className="hover:text-primary transition-colors">
                 contact@alphas-pompes.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span>
                Cité 112 logements cité seghir BT 03 ,<br />
                  bejaia - Algeria.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              {currentYear} ALPHAS POMPES. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="text-sm hover:text-primary transition-colors">
                Mentions Légales
              </Link>
              <Link href="/politique-confidentialite" className="text-sm hover:text-primary transition-colors">
                Politique de Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
