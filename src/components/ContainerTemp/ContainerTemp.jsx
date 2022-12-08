import React, { useState, useEffect, useRef } from 'react';
import Temporizador from '../Temporizador/Temporizador';

function insertLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
    // const storedBlogs = JSON.parse(localStorage.getItem(key));
}

const ContainerTemp = () => {
   //useEffect que  al cargar la página, obtiene la informacion de tareas en el local storage
   useEffect(() => {
    //obtengo el arreglo de tareas del localStorage
    const tareasStorage = localStorage.getItem('temporizadores');
    //si hay tareas en el localStorage, las cargo en el estado
    if(tareasStorage !== '' && tareasStorage !== null){
        setListTemp(JSON.parse(tareasStorage))
    }
}, []);
    //Componente que manejara la lista de los temporizadores 

    const [listTemp, setListTemp] = useState([]);

    const [temp, setTemp] = useState({
        id: 0,
        nombre: '',
        minutos: 0,
        segundos: 0,
        },
    );

    //Funcion que escrbe en el estado de tareasInput
    function handleWrite(event){
        if(event.target.name === "minutos"){
            setTemp({...temp, minutos: event.target.value})
        }else if(event.target.name === "segundos"){
            setTemp({...temp, segundos: event.target.value})
        }else if(event.target.name === "nombre"){
            setTemp({...temp, nombre: event.target.value})
        }
    }

    const handleSubmit = (event) => {
        if(temp.segundos > 60){
            alert("Los segundos no pueden ser mayor a 60");
        }else{
        event.preventDefault();
        let listLocal = [...listTemp,
            {id: listTemp.length,
             nombre: temp.nombre,
             minutos: temp.minutos,
             segundos: temp.segundos,
         }];
        setListTemp(listLocal);
        insertLocalStorage('temporizadores', listLocal); //Insert localStorage, key tareas
        }
    }

    //Eliminar una tarea específica
    function deleteTemp(id){
      const nuevaLista = listTemp.filter(temp => temp.id !== id);
      setListTemp(nuevaLista);
      insertLocalStorage('temporizadores', nuevaLista); //Insert localStorage, key tareas
    }

  return (
    <div>
      <h1>Lista de Temporizadores</h1>
       <form > 
           <table  className='TableTask'  id="customers">
               <thead>
                   <tr>
                       <th>Minutos: <input defaultValue={0} onChange={handleWrite}  min="0" max="60" type="number" name="minutos" id="inputMin" placeholder="Minutos" /></th>
                       <th>Segundos: <input  defaultValue={0} onChange={handleWrite} min="0" max="60" type="number" name="segundos" id="inputSeg" placeholder="Segundos" /></th>
                       <th><input  onChange={handleWrite}  type="text" name="nombre" id="inputTarea" placeholder="Nombre"/></th>
                   </tr>
               </thead>
           </table>
       </form>
       <div className='divButton'>
           <button  onClick={handleSubmit} >Agregar</button>     
       </div>
       <div>
           <table className='TableTask'  id="customers">
            <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Tiempo</td>
                    <td>Pausar</td>
                    <td>Borrar</td>
                </tr>
            </thead>
            </table>
            <table className='TableTask'  id="customers">
            {listTemp.length > 0 ? (
                listTemp.map((temp) => {
                    return <Temporizador key={temp.id} 
                    id={temp.id} 
                    nombre={temp.nombre} 
                    minutos={temp.minutos} 
                    segundos={temp.segundos} 
                    deleteTemp={deleteTemp}
                    insertLocalStorage={insertLocalStorage}/>
                })
                ) : (
                 <td>
                    <p id="textNoExitTask">No hay temporizadores Ingresados</p>
                </td>
                )
            }
            </table>
        </div>
    </div>
  )
}

export default ContainerTemp