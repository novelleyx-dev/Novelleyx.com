import React from 'react';
import Link from 'next/link';
import { Instagram, Youtube, Mail } from 'lucide-react';

import { footerLinks, contactInfo } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[#D4AF37]/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="mb-16 max-w-2xl">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#B8960C] text-transparent bg-clip-text">
              NOVELLEYX
            </span>
          </Link>
          <p className="text-gray-400 text-lg mb-2">
            For a better change. For a better India.
          </p>
          <p className="text-[#D4AF37] font-semibold tracking-wider">
            WE BUILD. WE GROW. WE EARN.
          </p>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition block py-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition block py-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">Experience</h4>
            <ul className="space-y-2">
              {footerLinks.experience.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition block py-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link: any) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition block py-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <hr className="border-[#D4AF37]/10 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NOVELLEYX. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {contactInfo.instagram && (
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D4AF37] transition">
                <Instagram size={20} />
              </a>
            )}
            {contactInfo.youtube && (
              <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D4AF37] transition">
                <Youtube size={20} />
              </a>
            )}
            {contactInfo.email && (
              <a href={`mailto:${contactInfo.email}`} className="text-gray-500 hover:text-[#D4AF37] transition">
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
