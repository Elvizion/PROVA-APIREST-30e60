const lanches = [
    {id: 1, nome: 'X-Burguer', preco: 18.00},
    {id: 2, nome: 'X-Salada', preco: 20.00},
    {id: 3, nome: 'X-Bacon', preco: 22.00},
    {id: 4, nome: 'X-Frango', preco: 19.00},
    {id: 5, nome: 'X-Veggie', preco: 21.00}
]

let proximoId=1

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

const criar=(req,res)=>{
    let body = ''

    req.on('data',chunk =>{
        body += chunk
    })
    
    req.on('end',()=>{
        const dados = JSON.parse(body)

        if(!dados.nome || dados.preco === undefined){
            res.writeHead(400,{'Content-Type': 'application/json'})
            res.end(JSON.stringify({erro: 'Nome e preço são obrigatorios'}))
            return
        }

        const novoLanche={id:proximoId++,nome:dados.nome,preco:dados.preco}
        lanches.push(novoLanche)
        
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(novoLanche))
    })
}

module.exports = {listarTodos,buscarPorId,listarDestaques,criar}