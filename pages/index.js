/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Article from "../components/Article";
import jsonBebidas from "../data/bebidas.json";
import jsonTransacciones from "../data/transacciones.json";
import {deleteID,actualizarBebidas,newTransaccion} from "../services/services";
import swal from 'sweetalert'
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
import uuid from 'react-uuid'

const inicialState = {
  id: "",
  dinero: "",
}

export default function Home() {
  const [bebidas, setBebidas] = useState([]);
  const [imputData, setImputData] = useState([inicialState]);
  let transaccion = {
    id: "",
    fecha: '',
    hora: "",
    importe: 0
};

  
  const handleChange = (e) => {
      setImputData({...imputData,[e.target.name]: e.target.value })
  }
  
  const sumarPresupuesto = () => {

      let importes = []

      jsonTransacciones.map((el) => {
        importes.push(el.importe);
    })
    const datoTotal = importes.reduce(
                        (previousValue, currentValue) => previousValue + currentValue,
                          0
                          );

    swal({
      title: "su ingreso es de " + datoTotal +" €",
      icon: "success",
    })
          
  }


  const handleSumit = (e) => {
      e.preventDefault();
      
      let jsonProductos = jsonBebidas.find(el => el.id == parseInt(imputData.id))

      if (jsonProductos == null) return swal({
        title: "bebida invalida",
        icon: "warning",
      })
        
  
      if (jsonProductos.precio == imputData.dinero && jsonProductos.cantidad != 0 ) {

          deleteID(imputData.id)
          setTimeout(() => {
            actualizarBebidas(parseInt(imputData.id),jsonProductos)
          }, 1000);
         
          swal({
            title: "gracias por su compra, disfrute su bebida",
            icon: "success",
          })

          transaccion = {
            id: uuid(),
            fecha: hoy.toLocaleDateString(),
            hora: hoy.toLocaleTimeString(),
            importe: jsonProductos.precio
           };
     
          newTransaccion(transaccion)
          
       } else if(jsonProductos.precio < imputData.dinero && jsonProductos.cantidad != 0 ) {
        
          deleteID(imputData.id)
          setTimeout(() => {
            actualizarBebidas(parseInt(imputData.id),jsonProductos)
          }, 1000);
         
          swal({
            title: "gracias por su compra, disfrute su bebida",
            text: "tiene un cambio de "+ (imputData.dinero - jsonProductos.precio ) +"€" ,
            icon: "success",
          })

          transaccion = {
            id: uuid(),
            fecha: hoy.toLocaleDateString(),
            hora: hoy.toLocaleTimeString(),
            importe: jsonProductos.precio
        };
          
          newTransaccion(transaccion)
      } else if(jsonProductos.cantidad == 0) {
       
        swal({
          title: "producto agotado",
          icon: "warning",
        })
      }
      else {
       
        swal({
          title: "dinero insuficiente para dicho producto",
          icon: "warning",
        })
      }
     
     
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/bebidas")
      .then((response) => response.json())
      .then((response) => setBebidas(response))
      .catch((error) => console.log(error));
  });

  return (
    <div className={styles.container}>
      <section className={styles.container_section}>
        {bebidas.map((el) => (
            <Article key={el.id}>
              <h1>{el.bebida}</h1>
              <h1>Nª{el.id}</h1>
              <img src={el.imagen} alt="" width="250px" height="200px" />
              <h1>precio: {`${el.precio}€`}</h1>
              <h1>cantidad: {el.cantidad}</h1>
            </Article>
        ))}
      </section>
      <form className={styles.form} onSubmit={handleSumit}>
        <label className={styles.form_label1}>
          Nª:
        </label>
          <input
         type="number" 
         name="id"
         onChange={handleChange}
         className={styles.form_input}
         />
        
        <label className={styles.form_label1}>  dinero:</label>
        
        <input 
        type="number" 
        step="0.01" 
        name="dinero"
        onChange={handleChange}
        className={styles.form_input}
        

         />
         
        <button type="submit" className={styles.btnComprar} >
          comprar
          </button>
      </form>

      <button className={styles.btnTransaccion} onClick={sumarPresupuesto}>
            Ver Registro
      </button>
    </div>
  );
}
