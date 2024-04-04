import React from 'react';
import PropTypes from 'prop-types';
import Cardcontact from './Cardcontact'; 

const Contact = ({ contacts, onDeleteContact, onToggleFavorite }) => {
  
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
  const AlphaContact = contacts.slice().sort(Contactorden);

  return (
    <div className='Contact'>
      <h2 className='Contactitle'>Contact List</h2>
      <div className='Contactcontainer'>
        {AlphaContact.length > 0 && AlphaContact.map((contact) => (
          <Cardcontact
            key={String(contact.id)}
            contact={contact}
            onDeleteContact={onDeleteContact}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

Contact.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired, //lista 
  onDeleteContact: PropTypes.func.isRequired, //elimina
  onToggleFavorite: PropTypes.func.isRequired, // marca favoritos
};

export default Contact;
