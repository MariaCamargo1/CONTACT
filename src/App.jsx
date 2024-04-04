//Importacion de modulos de react y bibiliotecas 
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'; //Utilizamos store de redux
import { Route, Routes } from 'react-router-dom'; //Rutas 
import { Navbar } from './routes/Navbar'; //Navbar.js en la carpeta routes
//Importacion de los componentes 
import Overview from './components/overview/Overview'; 
import Contact from './components/contact/Contact';
import Favorite from './components/favorite/Favorite';
import New from './components/new/New';
import axios from 'axios'; //realizar solicitudes HTTP
//configureStore de Redux Toolkit para crear el store
import { configureStore } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  contacts: [],
};

// reducer para manejar las acciones de los contactos
const rootReducer = (state = initialState, action) => {
  switch (action.type) {

// Agregar un nuevo contacto
    case 'ADD_CONTACT':
      return {
        ...state, // se crea una copia nueva 
        contacts: [...state.contacts, action.payload], //agrega el nuevo contacto
      };

//Eliminar un contacto
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((_, index) => index !== action.payload), 
        //Busca en la lista de contactos y quita el contacto que tenga el número de posición que nos dieron.
      };

//El estado a favorito de un contacto
    case 'TOGGLE_FAVORITE':
      return {
        ...state, // se crea una copia nueva 
        contacts: state.contacts.map((contact, index) => // se hace un mapeo de los contactos
          index === action.payload ? { ...contact, favorite: !contact.favorite } : contact
        ),
      };
//Si el número de posición es el mismo que el número que nos dieron,
//crea un nuevo contacto con el estado de favorito cambiado,
// decir, si era verdadero, ahora será falso y viceversa.
//Sino, devuelve el contacto tal como está.


    default:
      return state; //si una acción desconocida es despachada al store de Redux
                    //el reducer simplemente devuelve el estado sin alterarlo. 
  }
};

// Store de Redux utilizando el reducer 
const store = configureStore({
  reducer: rootReducer,
});

//Estado local para los contactos con función de inicialización que hara que tengamos los datos del local
function App() {
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem('contacts');
    return localData ? JSON.parse(localData) : initialState.contacts;
  });

  //UseEffect para obtener los contactos de la API utilizando axios cuando la lista de contactos está vacía.
  useEffect(() => {
    if (contacts.length === 0) {
      axios
        .get('https://reqres.in/api/users')
        .then((response) => {
          setContacts(response.data.data); //Actualizacion del estado local con los contactos que tiene la API
          localStorage.setItem('contacts', JSON.stringify(response.data.data)); //y se guardan los datos en el local
        })
        .catch((error) => {
          console.error('Error fetching contacts:', error); // se encarga de los errores de la solicitud HTTP
        });
    }
  }, [contacts.length]); //cuando length de la lista de contactos cambia

  // Agregar contacto 
  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact]; // se crea una nueva lista con el contacto que se agrega
    setContacts(updatedContacts); // actualizara el estado del local con la nueva lista 
    localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // y se actualiza el local
    store.dispatch({ type: 'ADD_CONTACT', payload: newContact }); // Despacha una acción para agregar el nuevo contacto al store de Redux
  };

  // eliminar contacto
  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);// se elimina el contacto que coincida con la ID
    if (updatedContacts.length !== contacts.length) {
      setContacts(updatedContacts); // actualizara el estado del local con la nueva lista 
      localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Actualiza el almacenamiento local
      store.dispatch({ type: 'DELETE_CONTACT', payload: contactId }); // Despacha una acción para eliminar el contacto del store de Redux
    }
  };
  

  // agregar favorito
  const handleToggleFavorite = (contact) => {
    const updatedContacts = [...contacts]; // se crea una copia de los contactos
    const index = updatedContacts.findIndex(c => c === contact);
    if (index !== -1) {
      updatedContacts[index].favorite = !updatedContacts[index].favorite; // se busca y encuentra el índice del contacto
      setContacts(updatedContacts); // se actualizara el local con los contactos agregados 
      localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // se actualiza el almacenamiento local
      store.dispatch({ type: 'TOGGLE_FAVORITE', payload: index }); // se usa dispatch para cambiar el estado de favorito de un contacto en el store
    }
  };

  return (
     //Provider para el store de Redux para los componentes
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Overview contacts={contacts} onToggleFavorite={handleToggleFavorite} onDeleteContact={handleDeleteContact} />}
          />
          <Route
            path="/favorite"
            element={<Favorite contacts={contacts} onToggleFavorite={handleToggleFavorite} />}
          />
          <Route
            path="/contact"
            element={<Contact contacts={contacts} onDeleteContact={handleDeleteContact} onToggleFavorite={handleToggleFavorite} />}
          />
          <Route path="/new" element={<New onAddContact={handleAddContact} />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
