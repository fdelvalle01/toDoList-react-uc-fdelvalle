import React, { useState, useEffect, useRef } from 'react';

const Temporizador = (props) => {

  const { id, nombre, minutos, segundos, deleteTemp, insertLocalStorage } = props;
  
  const [savedMillis, setSavedMillis] = useState(0);
  const [milli, setMilli] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    if (!started) {
      if (startRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        const lastStart = startRef.current;
        startRef.current = null;
        setSavedMillis((currentSavedMillis) => {
          return currentSavedMillis + +lastStart - + new Date();
        });
      }
    return;
    }
    startRef.current = new Date();
    intervalRef.current = setInterval(() => {
    let count = savedMillis + (+startRef.current + (minutos*60000) + (segundos*1000) - +new Date());
    count < 0 ? count = 0 : count =   setMilli(count);
    }, 300);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [started, savedMillis]);

  return (
    <div >
        <table className='TableTask'  id="customers">
            {
             <tbody key={id}>
                 <tr>
                     <td>{nombre}</td>
                     <td>{milli !== 0 ? new Date(milli).toISOString().split('T')[1].replace('Z', '') 
                     : `00:${minutos}:${segundos}.000` }</td>
                     <td>
                         <button><span className={started ? "fa fa-pause": "fa fa-play"}   onClick={() => {setStarted(!started) }} aria-hidden="true"></span></button>
                     </td>
                     <td>
                         <button><span className="fa fa-square"  onClick={(e) => deleteTemp(id)} aria-hidden="true"></span></button>
                      </td>
                    </tr>
                </tbody>
            }
           </table>
   </div>

  );
};


export default Temporizador