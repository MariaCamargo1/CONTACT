import React from 'react';
import { render, fireEvent } from '@testing-library/react'; //para simular eventos de los componentes 
import Overview from '../components/overview/Overview';

jest.mock('../components/overview/Overview.css', () => ({}));

{/*Se define un array contacts que contiene un solo objeto representando un contacto con su información.*/}
const contacts = [
  {
    first_name: 'Janet',
    last_name: 'Weaver',
    email: 'janet.weaver@reqres.in',
    avatar: 'avatar.jpg',
    favorite: true,
  },
];

const toggleFavoriteMock = jest.fn();

{/* garantiza que el componente Overview se renderice correctamente y que los elementos esperados, 
como el texto 'Favorite' y los nombres completos de los contactos, estén presentes en el renderizado.*/}
test('renders Overview component with contact list', () => { // se verifica si los contactos pasados a overview se exportan correctamente
  const { getAllByText, getByText, getAllByTestId } = render(
    <Overview contacts={contacts} onToggleFavorite={toggleFavoriteMock} />
  );

  expect(getByText('Favorite')).toBeInTheDocument(); // se verifica si el titulo se encuentra exportado

  const allJanetWeaverElements = getAllByText('Janet Weaver');
  expect(allJanetWeaverElements.length).toBe(2);
  allJanetWeaverElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });

{/*verifica la presencia del botón de eliminación, debe de existir un boton para eliminar contactos de favoritos*/}
  expect(getByText('x REMOVE')).toBeInTheDocument();
{/*verifica la existencia del titulo contact list */}
  expect(getByText('Contact List')).toBeInTheDocument();

  const contactCards = getAllByTestId('contact-card'); // se obtiene todos los elementos que tienen el atributo data-testid en contactcard
  expect(contactCards.length).toBe(contacts.length);  //verifica que el número de elementos obtenidos sea igual al número de contactos 
});

// se asegura que cuando se haga clic en el botón de eliminación en el componente Overview, se activará la función onToggleFavorite
test('clicking remove button triggers onToggleFavorite', () => {
  const { getByText } = render(
    <Overview contacts={contacts} onToggleFavorite={toggleFavoriteMock} />
  );

{/*se verifica si al hacer clic en el botón de eliminación, se activa correctamente la función toggleFavoriteMock 
con el primer contacto como argumento, lo que asegura que el comportamiento de eliminación funcione correctamente 
y realice las acciones necesarias en la aplicación.*/}
  const removeButton = getByText('x REMOVE');

  fireEvent.click(removeButton);

  expect(toggleFavoriteMock).toHaveBeenCalledWith(contacts[0]);
});
