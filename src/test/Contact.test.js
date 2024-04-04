import React from 'react';
import { render, fireEvent } from '@testing-library/react'; //para simular eventos de los componentes
import Contact from '../components/contact/Contact';

jest.mock('../components/contact/Contact.css', () => ({}));

{/*Se define un array contacts que contiene un solo objeto representando un contacto con su información.*/}
describe('Contact component', () => {
  const contacts = [
    {
      id: '1', // Agregamos el id para cada contacto
      first_name: 'Emma',
      last_name: 'Wong',
      email: 'emma.wong@reqres.in',
      favorite: true,
      avatar: 'avatar.jpg',
    },
  ];

//simulaMOS acciones de eliminación y favorito
  const onDeleteContactMock = jest.fn();
  const onToggleFavoriteMock = jest.fn();

{/* Contact se renderiza correctamente con los datos proporcionados y si las funciones mock asociadas 
a la eliminación y favorito se han pasado correctamente como props.*/}
  test('renders contact list with correct data', () => {
    const { getByText, getAllByTestId } = render(
      <Contact
        contacts={contacts}
        onDeleteContact={onDeleteContactMock}
        onToggleFavorite={onToggleFavoriteMock}
      />
    );

//se prueba la existencia del titulo
    expect(getByText('Contact List')).toBeInTheDocument();

//los nombre, correo, de cada contacto se debe mostrar en la contact
    contacts.forEach(contact => {
      expect(getByText(`${contact.first_name} ${contact.last_name}`)).toBeInTheDocument();
      expect(getByText(contact.email)).toBeInTheDocument();
    });

    const deleteButtons = getAllByTestId('delete-button'); //se toman los botones de eliminar de los contactos
    expect(deleteButtons.length).toBe(contacts.length); //se revisa si cada contacto tiene su boton eliminar
    deleteButtons.forEach((button, index) => {
      fireEvent.click(button); //con firevent se simula lo que haria el boton de eliminar
      expect(onDeleteContactMock).toHaveBeenCalledWith(contacts[index].id); //se espera que onDeleteContactMock sea llamada con el ID del contacto en la posición index dentro del arreglo contacts.
    });

    //primero se mira si cada contacto tiene su boton de favorito
    const favoriteButtons = getAllByTestId('favorite-button');
    expect(favoriteButtons.length).toBe(contacts.length);
    
    //se simula la accion que haria el boton de favorito
    favoriteButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(onToggleFavoriteMock).toHaveBeenCalledWith(contacts[index]); 
    });
  });
});
