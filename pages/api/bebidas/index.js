// import dataBebidas from "../../../data/bebidas.json";
const fs = require('fs');
const path = require('path');

const ficheroBebidas =  path.join('./data/', 'bebidas.json')
// const ficheroTrasacciones = path.join('./data/')
let stringData = fs.readFileSync(ficheroBebidas,'utf-8')

let dataActualizada = JSON.parse(stringData)
let transaccionesData = fs.readFileSync('./data/transacciones.json', 'utf-8')
let transaccionActualizada = JSON.parse(transaccionesData)
let jsonActual;
export default  function  handler(req, res) {
   
    switch (req.method) {
        case 'GET':
            res.status(200).json(dataActualizada)  
            break;
        case 'POST':
        
            const {id, fecha, hora,importe} = req.body;
            transaccionActualizada.push(req.body)
            jsonActual = JSON.stringify(transaccionActualizada)
            fs.writeFileSync("./data/transacciones.json",jsonActual)
            
            return res.status(200).json({id, fecha, hora,importe});
            break;

        case 'PUT':
            return actualizarBebida(req,res)
            break;
       
        default:
            break;
    }

   

    
}

const actualizarBebida = (req,res) => {
    const {id,bebida,precio,imagen,cantidad} = req.body;
    dataActualizada = dataActualizada.filter(e => e.id !== id)

    dataActualizada.push(req.body)
    jsonActual = JSON.stringify(dataActualizada)
    fs.writeFileSync("./data/bebidas.json",jsonActual)

    return res.status(200).json({id,bebida,precio,imagen,cantidad});
}



