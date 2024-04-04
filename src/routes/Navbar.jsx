// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'; // Importa el ícono de la casa desde Font Awesome
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'; // Importa el ícono de la equis desde Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon de Font Awesome
import './Navbar.css';

 // Estado local para controlar si el menú de navegación está abierto o cerrado
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar entre abrir y cerrar el menú de navegación
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para cerrar el menú de navegación
  const closeMenu = () => {
    setIsOpen(false);
  };



  return (
    <nav className='Navbarcontainer'>
      <div className='Navbarlogo'>
        <Link to="/" className="logo"> {/*linked to overview*/}
          <i className="fa-solid fa-address-book"></i>
        </Link>
      </div>

      <div className={`Navbaroutes ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="Navbarlink" onClick={closeMenu}>Overview</Link>
        <Link to="/contact" className="Navbarlink" onClick={closeMenu}>Contact</Link>
        <Link to="/favorite" className="Navbarlink" onClick={closeMenu}>Favorite</Link>
        <Link to="/new" className="Navbarlink Navbarnew" onClick={closeMenu}>+ New</Link>
      </div>

      <div className="BurgerMenu" onClick={toggleMenu}>
      {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faHouse} />}
      </div>
    </nav>
  );
};
