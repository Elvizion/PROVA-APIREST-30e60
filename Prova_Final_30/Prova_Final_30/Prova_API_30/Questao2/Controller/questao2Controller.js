const lanches = [
    {id: 1, nome: 'X-Burguer', preco: 18.00},
    {id: 2, nome: 'X-Salada', preco: 20.00},
    {id: 3, nome: 'X-Bacon', preco: 22.00},
    {id: 4, nome: 'X-Frango', preco: 19.00},
    {id: 5, nome: 'X-Veggie', preco: 21.00}
]

const listarTodos = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(lanches))
}

const buscarPorId = (req, res, id) => {

    let encontrado = null

    for(let i = 0; i < lanches.length; i++) {

        if(lanches[i].id === id) {
            encontrado = lanches[i]
        }
    }

    if(!encontrado) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({erro: 'Lanche não encontrado'}))
        return
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(encontrado))
}

const listarDestaques = (req, res) => {

    const destaques = []

    for(let i = 0; i < lanches.length; i++) {

        if(lanches[i].preco < 20) {
            destaques.push(lanches[i])
        }
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(destaques))
}

module.exports = {listarTodos,buscarPorId,listarDestaques}