const filmes = [
    {id: 1, titulo: 'Interstellar', genero: "Ficção-Cientifica", nota: 8.6},
    {id: 2, titulo: 'Onde Os Fracos Não Tem Vez', genero: "Suspense", nota: 8.1},
    {id: 3, titulo: 'Tropa de Elite', genero: "Ação", nota: 8.0}
]

let proximoId=1

const listarTodos = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(filmes))
}

const buscarPorId = (req, res, id) => {

    let encontrado = null

    for(let i = 0; i < filmes.length; i++) {

        if(filmes[i].id === id) {
            encontrado = filmes[i]
        }
    }

    if(!encontrado) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({erro: 'Filme não encontrado'}))
        return
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(encontrado))
}

const criar=(req,res)=>{
    let body = ''

    req.on('data',chunk =>{
        body += chunk
    })
    
    req.on('end',()=>{
        const dados = JSON.parse(body)

        if(!dados.titulo || !dados.genero || dados.nota === undefined){
            res.writeHead(400,{'Content-Type': 'application/json'})
            res.end(JSON.stringify({erro: 'Nome, genero e nota são obrigatorios'}))
            return
        }

        const novoFilme={id:proximoId++,titulo:dados.titulo,genero:dados.genero,nota:dados.nota}
        filmes.push(novoFilme)
        
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(novoFilme))
    })
}

module.exports = {listarTodos,buscarPorId,criar}