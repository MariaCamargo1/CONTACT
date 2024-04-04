import React from 'react';
import PropTypes from 'prop-types';
import Cardfavorite from './Cardfavorite'; // Asegúrate de que la ruta del archivo sea correcta

export const Favorite = ({ contacts = [], onToggleFavorite }) => {

  // Función para comparar dos contactos por su nombre
  const Contactorden = (a, b) => {
    const nameA = a.first_name.toLowerCase();
    const nameB = b.first_name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  // Ordenar los contactos por nombre
  const Alphacontact = contacts.slice().sort(Contactorden);

  return (
    <div className='Favorite'>
      <h2 className='Favoritetitle'>Favorites</h2>
      <div className='Favoritecontainer'>
        {Alphacontact.length > 0 && Alphacontact
          .filter((contact) => contact.favorite) 
          .map((contact, index) => (
            <Cardfavorite
              key={index}
              contact={contact}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
      </div>
    </div>
  );
};

Favorite.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string,
      email: PropTypes.string.isRequired,
      favorite: PropTypes.bool,
      avatar: PropTypes.string, 
    })
  ).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default Favorite;
