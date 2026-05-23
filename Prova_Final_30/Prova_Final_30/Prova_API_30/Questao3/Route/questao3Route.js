const {listarTodos,buscarPorId,listarDestaques,criar} = require('../Controller/questao3Controller')

const questao3Route = (req, res) => {

    const partes = req.url.split('/')
    const segmento = partes[2]

    const temId = segmento && !isNaN(parseInt(segmento))
    const id = temId ? parseInt(segmento) : null

    // GET /lanches
    if(req.method === 'GET' && req.url === '/lanches') {

        listarTodos(req, res)
    }

    // GET /lanches/destaques
    else if(req.method === 'GET' && req.url === '/lanches/destaques') {

        listarDestaques(req, res)
    }

    // GET /lanches/:id
    else if(req.method === 'GET' && temId) {

        buscarPorId(req, res, id)
    }

    else if(req.method==='POST' && !temId){
        criar(req,res) 
    } 

    else {

        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({erro: 'Rota não encontrada'}))
    }
}

module.exports = questao3Route