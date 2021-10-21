import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Platillo from '../ui/Platillo';

const Menu = () =>{

    //define el state
    const [ platillos, guardarPlatillos ] = useState([]);

    const{ firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() =>{
        const obtenerPlatillos =  () =>{
            const resultado = firebase.db.collection('productos').onSnapshot(manejarSnapshot);
            
        }
        obtenerPlatillos();
    }, []);

    //funcion para traer datos en tiempo real de la base de datos.
    function manejarSnapshot(snapshot){
        const platillos = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        //almacena resultados en el state
        guardarPlatillos(platillos);
    }

    return(
        <>
            <h1 className="text-3xl font-light mb-4">Menú</h1>
            <Link to="/nuevo-platillo" className=" bg-blue-800 hover:bg-blue-700, inline-block nb-5 p-2 text-white uppercase font-bold">
                Agregar Platillo
            </Link>

            {platillos.map(platillo =>(
                <Platillo
                key={platillos.id}
                platillo={platillo}>

                </Platillo>
            ))}

        </>
    );
}

export default Menu;
