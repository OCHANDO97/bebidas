const fs = require('fs');
let transaccionesData = fs.readFileSync('./data/transacciones.json', 'utf-8')
let transaccionActualizada = JSON.parse(transaccionesData)

export default  function  handler (req, res) {

    switch (req.method) {
        case 'GET':
        res.status(200).json(transaccionActualizada)  
        break;
    }
}