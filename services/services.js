const axios = require('axios');

const deleteID = (id) => {
    fetch(`http://localhost:3000/api/bebidas/${id}`, {
        method: 'DELETE',
     }) }

const actualizarBebidas = (id,jsonBebidas) =>  {
    axios.put("http://localhost:3000/api/bebidas",{
            id:id,
            bebida:jsonBebidas.bebida,
            precio: jsonBebidas.precio,
            imagen: jsonBebidas.imagen,
            cantidad: jsonBebidas.cantidad -1
          })
        }

const newTransaccion = (transaccion) => {

      axios.post("http://localhost:3000/api/bebidas" , {
        id:transaccion.id,
        fecha: transaccion.fecha,
        hora: transaccion.hora,
        importe: transaccion.importe
      })
}        


module.exports = {deleteID,actualizarBebidas,newTransaccion}