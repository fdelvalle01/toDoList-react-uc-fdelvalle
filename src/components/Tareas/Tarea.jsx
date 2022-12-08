import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './Tarea.css'

function insertLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
    // const storedBlogs = JSON.parse(localStorage.getItem(key));
}

const Tarea = () => {

    const [tareasInput, setTareasInput] = useState(''); // Inicializo el estado de tareas como un arreglo vacío
    const [checkFilter, setCheckFilter] = useState(false); // Inicializo el estado de checkFilter como false
    //hooks de estado para manejar el estado de la tarea
    const [listTask, setListTask] = useState([]);

    // id de la tarea que se esta editando
    const seqIdRef = useRef(0);

    //useEffect que  al cargar la página, obtiene la informacion de tareas en el local storage
    useEffect(() => {
        //obtengo el arreglo de tareas del localStorage
        const tareasStorage = localStorage.getItem('tareas');
        //si hay tareas en el localStorage, las cargo en el estado
        if(tareasStorage !== '' && tareasStorage !== null){
            setListTask(JSON.parse(tareasStorage))
        }
    }, []);

    //Componente que ingresara una tarea al componente lista de tareas
    //Agregar tareas escribiendo en una entrada de texto y presionando enterpara dejarla registrad
    const handleSubmit = (event) => {
        event.preventDefault();
        if(tareasInput !== "" && tareasInput !== " "){
            let listLocal = [...listTask, {id: seqIdRef.current, nombre: tareasInput, estado: false}];
            setListTask(listLocal);
            seqIdRef.current += 1;
            setTareasInput(''); //Limpiado de input al ingresar un campo
            insertLocalStorage('tareas', listLocal); //Insert localStorage, key tareas
        }else{
            alert("Debe ingresar un texto");
        }
    }

    //Funcion que escrbe en el estado de tareasInput
    function handleWrite(event){
        console.log(event.target.value);
        setTareasInput(event.target.value);
    }

    //funcion marca tareas como completadas. Al completarse, el texto debe tacharse.
    function completarTarea(index ,event){
        // obtener valor de la seleccion del checkbox
        const nuevaLista = [...listTask];
        nuevaLista[index].estado = event.target.checked;
        setListTask(nuevaLista);
    }
    
    //Eliminar una tarea específica
    function deleteTask(index, item, e){
        const nuevaLista = listTask.filter(tarea => tarea.id !== item.id);
        setListTask(nuevaLista);
        insertLocalStorage('tareas', nuevaLista); //Insert localStorage, key tareas
    }

    //Modificar una tarea en especifico dentro de la lista de tareas, listTask, al obtener el valor del mismo input. 
    function modifyTask(index, item, e){
        if(tareasInput !== "" && tareasInput !== " "){
            const mapBasedUpdate = listTask.map((element) => {
                if (element.id !== item.id) return element;
                return {
                  ...element,
                  nombre:  tareasInput,
                };
              });
            setTareasInput(''); //Limpiado de input al ingresar un campo
            setListTask(mapBasedUpdate);
            insertLocalStorage('tareas', mapBasedUpdate); //Insert localStorage, key tareas
        }else{
            alert("Debe ingresar un texto");
        }
    }

    //Metodo filtrado al vuelo como dice el profe. uwu
    const lists = checkFilter ?  listTask.filter(tarea => tarea.estado === false) : listTask;

  return (
    <div>
        <h1>Lista de Tareas</h1>
        <table className='TableTask' id="customers">
            <thead>
                <tr>
                    <th>Nueva tarea</th>
                    <th>
                    <form onSubmit={handleSubmit}> 
                        <input value={tareasInput} type="text" name="inputTarea" id="inputTarea" placeholder="Ingresa una tarea" onChange={handleWrite}/>
                    </form>                
                    </th>
                    <th><input type="checkbox" name="checkTarea" id="checkTarea" onChange={(e) => setCheckFilter(e.target.checked)} />Mostrar faltante</th>
                </tr>
            </thead>
        </table>
        <div >
        <table className='TableTask' id="customers">
                <tbody>
                <tr>
                    <td>Estado</td>
                    <td>Nombre</td>
                    <td>Borrar</td>
                    <td>Modificar </td>
                </tr>
                </tbody>
                {lists.length > 0 ? (
                    lists.map((item, index)=> (
                        <tbody key={item.id}>
                            <td><input type="checkbox" name="checkTarea" id="checkTarea" checked={item.estado} onClick={(e) => completarTarea(index, e)} /></td>
                            {/* Poder marcar tareas como completadas. Al completarse, el texto debe tacharse. */}
                            <td className={`${item.estado ? 'strikethrough' : ''}`}>{item.nombre}</td>
                            <td>
                                <button type="button" name="checkTarea" id="checkTarea" onClick={(e) => deleteTask(index, item, e)}>
                                    <span className="fa fa-trash-o" aria-hidden="true"></span>
                                </button>
                            </td>
                            <td>
                                <button type="button" name="checkTarea" id="checkTarea" onClick={(e) => modifyTask(index, item, e)}>
                                    <span className="fa fa-pencil" aria-hidden="true"></span>
                                </button>
                            </td>
                        </tbody>
                    ))
                    ) : ( 
                        <td colspan="4">
                            <p id="textNoExitTask">No hay tareas registradas</p>
                        </td>
                    )
                }
        </table>
        </div>
    </div>
  )
}

export default Tarea
