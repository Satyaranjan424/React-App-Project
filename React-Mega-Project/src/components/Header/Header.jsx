import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="bg-gray-500 shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          
          {/* Logo + Tagline */}
          <div className="flex flex-col">
            <Link to="/">
              <Logo width="90px" />
            </Link>
            <span className="text-xs text-gray-200 mt-1 tracking-wide">
              Share your thoughts with the world
            </span>
          </div>

          {/* Navigation */}
          <ul className="flex items-center gap-3 ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="
                        px-5 py-2 
                        rounded-full 
                        text-white 
                        text-sm font-medium
                        transition-all duration-300
                        hover:bg-gray-400 
                        hover:text-black
                        hover:scale-105
                      "
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout */}
            {authStatus && (
              <li>
                <div className="ml-2">
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;