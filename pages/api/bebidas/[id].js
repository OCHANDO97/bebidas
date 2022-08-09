import dataId from '../../../data/bebidas.json'
const fs = require('fs');
const path = require('path');


const rutaArchivo =  path.join('./data/', 'bebidas.json')
let stringData = fs.readFileSync(rutaArchivo,'utf-8')
let dataActualizada = JSON.parse(stringData)

export default async function handler (req, res) {
    const {id} = req.query

    switch (req.method) {
        case 'GET':       
            let objID = dataActualizada.find(e => e.id == [id] )           
            return res.status(200).json(objID)
            break;

        case 'DELETE':         
            dataActualizada = dataActualizada.filter(e => e.id !== parseInt([id]) )
              
            const jsonBook = JSON.stringify(dataActualizada)
            fs.writeFileSync("./data/bebidas.json",jsonBook)
            
            return res.status(200).json(jsonBook)
            
            break;
        default:
            break;
    }
}