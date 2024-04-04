import React from 'react';
import PropTypes from 'prop-types';
import './Favorite.css'; // Asegúrate de que la ruta del archivo CSS sea correcta

const Cardfavorite = ({ contact, onToggleFavorite }) => {
  const handleToggleFavorite = () => {
    onToggleFavorite(contact);
  };

  return (
    <div className='Favoritecard'>
      <div className='Favoritephoto'>
        <img src={contact.avatar || 'https://cdn.pulse2.com/cdn/2020/07/Globant.png'} alt={contact.first_name} />
      </div>
      <div className='Favoritename'>
        <strong> {contact.first_name} {contact.last_name && `${contact.last_name}`}</strong>
      </div>
      <div className='Favoritemail'>
        {contact.email}
      </div>
      <hr className='Favoritehr'/>
      <button className='Favoriteremove' onClick={handleToggleFavorite}>
        {contact.favorite && 'x REMOVE'}
      </button>
    </div>
  );
};

Cardfavorite.propTypes = {
  contact: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    avatar: PropTypes.string, 
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default Cardfavorite;
