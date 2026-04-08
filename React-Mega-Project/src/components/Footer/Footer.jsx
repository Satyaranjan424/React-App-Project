import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gray-400 border-t-2 border-gray-600 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Logo + About */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Logo width="110px" />
              <p className="mt-4 text-sm text-gray-700 max-w-sm">
                A modern platform to share your thoughts, ideas and creativity with the world.
              </p>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              © 2026 Satyaranjan Das. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-800 hover:text-black transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-800 hover:text-black transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-800 hover:text-black transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="mt-10 pt-6 border-t border-gray-500 text-center text-sm text-gray-700">
          Built with ❤️ by Satyaranjan
        </div>

      </div>
    </footer>
  )
}

export default Footer