import React, { useState } from 'react';
import './New.css';
import { v4 as uuidv4 } from 'uuid'; // generamos identificadores únicos

//trabajamos con hook para los campos del formulario
export const New = ({ onAddContact }) => {
  const [first_name, setFirst_Name] = useState(''); 
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false); //la imagen esta cargando


  const handleSubmit = (e) => {
    e.preventDefault(); 
    
 // los campos deben estar llenos para continuar
    if (!first_name || !last_name || !email) {
      return; //si los campos estan vacio no se hara envio del formulario
    }

   // Crea un nuevo contacto con un ID unico
    const newContact = {
      id: uuidv4().toString(), // identificador unico para cada contacto que se cree
      first_name,
      last_name,
      email,
      favorite: isFavorite,
      avatar: avatar, 
    }; 
    onAddContact(newContact);
    // los campos del formulario vuelven a su estado normal luego de haber enviado el nuevo contacto
    setFirst_Name('');
    setLast_Name('');
    setEmail('');
    setIsFavorite(false);
    setAvatar(''); 
  };

//Para la imagen
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // cargamos la imagen que deseamos poner ....
    // si ya se encuentra la imagen que cargamos ....
    if (file) {
      //se reazila el loading de la imagen
      setLoading(true);
      const reader = new FileReader(); // crea un nuevo objeto llamado reader que se utiliza para leer el contenido de un archivo.

// se configura dos manejadores de eventos para el objeto FileReader reader
//  Este evento se activa cuando la operación de lectura del archivo se completa con éxito. 
      reader.onload = (event) => {
        setAvatar(event.target.result); // se ejecuta una función que toma el resultado de la lectura, y lo utiliza para establecer el avatar en el estado. 
        setLoading(false); //Luego, marca que la carga ha finalizado
      };
      reader.readAsDataURL(file);
    }
  };

//ENVIO DEL FORMULARIO
  return (
    <div className='New'>
      <div className='Newform'>
        <form onSubmit={handleSubmit}>
          <div >
            <input className='Newname' type="text" placeholder="First name" value={first_name} onChange={(e) => setFirst_Name(e.target.value)} required />
          </div>
          <div >
            <input className='Newname' type="text" placeholder="Last name" value={last_name} onChange={(e) => setLast_Name(e.target.value)} required />
          </div>
          <div >
            <input className='Newemail' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className='Newnamebox'>Enable like favorite <input className='Newcheckbox' type="checkbox" checked={isFavorite} onChange={(e) => setIsFavorite(e.target.checked)} />
            </label>
          </div>
          <div >
            <label className='Newnamephoto'>Upload a photo <input className='Newphoto' type="file" accept="avatar/*" onChange={handleAvatarChange} />
            </label>
          </div>
          {loading && <p>Loading image...</p>}
          <button className='Newsave' type="submit">SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default New;
