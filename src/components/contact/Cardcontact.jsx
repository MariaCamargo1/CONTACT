import React from 'react';
import PropTypes from 'prop-types';
import './Contact.css';

const Cardcontact = ({ contact, onDeleteContact, onToggleFavorite }) => {
  const handleToggleFavorite = () => {
    onToggleFavorite(contact);
  };

  const handleDeleteContact = () => {
    onDeleteContact(contact.id); // identificador único del contacto
  };

  return (
    <div className='Contactcard' key={contact.id}>
      <div className='Contactphoto'>
        <img src={contact.avatar || 'https://cdn.pulse2.com/cdn/2020/07/Globant.png'} alt={`${contact.first_name} ${contact.last_name}`} />
      </div>
      <div className='Contactname'>
        <strong> {contact.first_name} {contact.last_name && `${contact.last_name}`}</strong>
      </div>
      <div className='Contactemail'>
        {contact.email}
      </div>
      <hr className='Contacthr'/>
      <button className="fa-solid fa-trash" data-testid="delete-button" onClick={handleDeleteContact}></button>
      <button className={`fa-solid fa-heart ${contact.favorite ? 'favorite' : 'x'}`} data-testid="favorite-button" onClick={handleToggleFavorite}></button>
    </div>
  );
};

Cardcontact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ajusta el tipo de dato según el tipo real del identificador único
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    email: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    avatar: PropTypes.string, 
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default Cardcontact;
