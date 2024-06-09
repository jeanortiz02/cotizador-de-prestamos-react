
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Button";
import Swal from "sweetalert2";
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {

  // Solo se usa el useState cuando la variable se va a modificar
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pagar, setPagar] = useState(0);

  // Escucha por el monto solicitado y meses
  useEffect(() => {
    const totalaPagar = calcularTotalPagar(cantidad, meses);
    setTotal(totalaPagar);
  }, [cantidad, meses])

  useEffect(() => {
    setPagar(total / meses);
  }, [total])

  // Estan en mayusculas porque son constante y su valor nunca cambia
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;
  
  function handleChange(e) {
    setCantidad(+e.target.value)
  }

  function handleClickDecremento() {

    const valor = cantidad - STEP;

    if(valor < MIN){
      // alert('Cantidad no valida');
      Swal.fire( 
        'Cantidad no valida',
        'Preisona OK para continuar',
        'error'
      )
      return;
    }

    setCantidad(valor);
  }

  function handleClickIncremento() {

    const valor = cantidad + STEP;

    if(valor > MAX){
      // alert('Cantidad no valida');
      Swal.fire( 
        'Cantidad no valida',
        'Preisona OK para continuar',
        'error'
      )
      return;
    }

    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />

        <div className="flex justify-between my-3">
          <Button 
            operador= '-'
            fn={handleClickDecremento}          
          />

          <Button 
            operador= '+'
            fn={handleClickIncremento}          
          />
        </div>


        <input 
          type="range"
          className="w-full h-6 bg-gray-200 accent-lime-200 hover:accent-lime-600"
          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
        />
        <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
          {formatearDinero(cantidad)}
          </p>

        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Elige un <span className='text-indigo-600'>Plazo</span> a pagar
          
        </h2>
        <select className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={meses}
        onChange={e => setMeses(+e.target.value)}
        >
          <option value="6">6 meses</option>
          <option value="12">12 meses</option>
          <option value="24">24 meses</option>
        </select>

        <div className='my-5 space-x-3 bg-gray-50 p-5'>
          <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
            Resumen<span className='text-indigo-600'> de pagos</span>
          </h2>

          <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
          <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
          <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pagar)} Mensuales</p>

        </div>

    </div>
  )
}

export default App

// JSX es una sintaxis especial que permite ciertas funciones en el 
// HTML pero hay algunas no soportadas
