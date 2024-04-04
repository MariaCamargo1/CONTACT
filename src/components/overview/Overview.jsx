import React from 'react';
import PropTypes from 'prop-types';
import './Overview.css';

// Componente Overview
export const Overview = ({ contacts = [], onToggleFavorite }) => {

   // manejara la accion de hacer clic en el botón de favoritos
  const handleToggleFavorite = (contact) => {
    onToggleFavorite(contact); // se llama onToggleFavorite pasando el contacto correspondiente
  };

// comparar dos contactos por su nombre
  const Contactorden = (a, b) => {
// Convertir los nombres de los contactos a minúsculas para asegurar una comparación insensible a mayúsculas
    const nameA = a.first_name.toLowerCase();
    const nameB = b.first_name.toLowerCase();
// Compara los nombres de los contactos y devuelve un valor basado en el resultado de la comparación
    if (nameA < nameB) {
// Si el nombre de a es menor que el nombre de b, devuelve -1 para indicar que a debe colocarse antes que b en la lista ordenada
      return -1;
    }
// Si el nombre de a es mayor que el nombre de b, devuelve 1 para indicar que b debe colocarse antes que a en la lista ordenada
    if (nameA > nameB) {
      return 1;
    }
 // Si los nombres son iguales, devuelve 0 para indicar que no se necesita ningún cambio en el orden de los elementos
    return 0;
  };
  // Ordenar los contactos por nombre
  const AlphaContacts = contacts.slice().sort(Contactorden);

  return (
    <div className='Overview'>
      <h2 className='Overviewtitle'>Favorite</h2>  {/* favoritos */}
      <div className='Overviewcontainer'>
           {/* Mapea y renderiza los contactos favoritos */}
        {AlphaContacts && AlphaContacts.length > 0 && AlphaContacts
          .filter((contact) => contact.favorite) //se muestran los favoritos 
          .map((contact, index) => (
            <div key={index} className='Overviewcard' data-testid="contact-card">
              <div className='Overviewphoto'> 
                <img src={contact.avatar || 'https://cdn.pulse2.com/cdn/2020/07/Globant.png'} alt={`${contact.first_name} ${contact.last_name}`} className='Overviewimg'/>
              </div>  {/*foto del contacto o una imagen de reemplazo*/}
              
                <h5 className='Overviewname'> {contact.first_name} {contact.last_name && `${contact.last_name}`}</h5>
                <p className='Overviewemail'> {contact.email}</p> 
                <hr className='Overviewhr'/>

               {/* desmarcar de favoritos */}
              <button className='Overviewremove' onClick={() => handleToggleFavorite(contact)}>
                {contact.favorite && 'x REMOVE' } 
              </button>
            </div>
          ))}
      </div>
      <h2 className='Overviewtitle'>Contact List </h2>
      <div className='Overviewcontainer'>
        {AlphaContacts && AlphaContacts.length > 0 && AlphaContacts.map((contact, index) => (
          <div key={index} className='Overviewcard'>
            <div className='Overviewphoto'>
              <img src={contact.avatar || 'https://cdn.pulse2.com/cdn/2020/07/Globant.png'} alt={`${contact.first_name} ${contact.last_name}`} className='Overviewimg'/>
            </div>
            
              <h5 className='Overviewname'> {contact.first_name} {contact.last_name && `${contact.last_name}`} </h5>
              <p className='Overviewemail'> {contact.email}</p>
              <hr className='Overviewhr'/>
              
            <button className={`fa-solid fa-heart ${contact.favorite ? 'favorite' : ''}`}  onClick={() => handleToggleFavorite(contact)} >
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

//Se espera recibir un array de objetos llamado contacts, Cada objeto en este array debe tener las siguientes propiedades
Overview.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired, 
      last_name: PropTypes.string,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      favorite: PropTypes.bool,
    })
  ).isRequired,
  onToggleFavorite: PropTypes.func.isRequired, //recibir la funcion para el evento de agregar favorito
};

export default Overview;
