const {listarTodos,buscarPorId} = require('../Controller/filmeController')

const filmeRoute = (req, res) => {

    const partes = req.url.split('/')
    const segmento = partes[2]
    const temId = segmento && !isNaN(parseInt(segmento))
    const id = temId ? parseInt(segmento) : null

    // GET /lanches
    if(req.method === 'GET' && req.url === '/filmes') {

        listarTodos(req, res)
    }
    // GET /lanches/:id
    else if(req.method === 'GET' && temId) {

        buscarPorId(req, res, id)
    }

    else {

        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({erro: 'Rota não encontrada'}))
    }
}

module.exports = filmeRoute