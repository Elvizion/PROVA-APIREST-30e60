const filmes = [
    {id: 1, titulo: 'Interstellar', genero: "Ficção-Cientifica", nota: 8.6},
    {id: 2, titulo: 'Onde Os Fracos Não Tem Vez', genero: "Suspense", nota: 7.5},
    {id: 3, titulo: 'Tropa de Elite', genero: "Ação", nota: 8.0}
]

let proximoId=4

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

const substituir = (req, res, id) => {
    // primeiro encontra o índice do aluno no array
    let indice = -1
    for (let i = 0; i < filmes.length; i++) {
      if (filmes[i].id === id) indice = i
    }
    if (indice === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ erro: 'Filme não encontrado' }))
      return
    }
    // lê o body — PUT sempre tem body com os novos dados
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      const dados = JSON.parse(body)
      // PUT exige todos os campos — valida antes de substituir
      if (!dados.titulo || !dados.genero || dados.nota === undefined) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ erro: 'Nome e nota são obrigatórios' }))
        return
      }
      // substitui o objeto inteiro — mantém só o id
      filmes[indice] = {id,titulo: dados.titulo,genero:dados.genero,nota:dados.nota}
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(filmes[indice]))
    })
}

const atualizar = (req, res, id) => {
    let indice = -1

    for (let i = 0; i < filmes.length; i++){
        if (filmes[i].id === id) indice = i
        }
        if (indice === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ erro: 'Filme não encontrado' }))
            return
        }
        
    let body = ''

    req.on('data', chunk => { body += chunk })
        
    req.on('end', () =>{
        const dados = JSON.parse(body)// atualiza só os campos que foram enviados
        // !== undefined: só muda se veio no body
        if (dados.titulo !== undefined) filmes[indice].titulo = dados.titulo
        if (dados.genero !== undefined) filmes[indice].genero = dados.genero
        if (dados.nota !== undefined) filmes[indice].nota = dados.nota
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(filmes[indice]))
    })
}

const remover = (req, res, id) => {
    let indice = -1
        
    for (let i = 0; i < filmes.length; i++) {
        if (filmes[i].id === id) indice = i
    }
        if (indice === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ erro: 'Filme não encontrado' }))
        return
        }
    filmes.splice(indice, 1)
    res.writeHead(204)
    res.end()
}

module.exports = {listarTodos,buscarPorId,criar,atualizar,substituir,remover}