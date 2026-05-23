const http = require('http')

const lanches=[
    {id: 1, nome: 'X-Burguer', preco: 18.00}
]

const servidor = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify({"api": "Cardapio da Lanchonete", "version": "1.0"}))
    }
    else if(req.method === 'GET' && req.url === '/lanches'){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(lanches))
    }
    else{
        res.writeHead(404)
        res.end(JSON.stringify({"error": "Rota não encontrada"}))
    }
})

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
