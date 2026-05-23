const http=require('http')
const filmeRoute=require('./Route/filmeRoute')

const servidor = http.createServer((req,res) => {
  if(req.url.startsWith('/filmes')){
    filmeRoute(req, res)
  } 

  else if(req.method === 'GET' && req.url === '/filmes/destaques'){
    const destaques=[]
    for(let i=0;i<filmes.length;i++){
        if(!filmes[i].nota >= 8){
            destaques.push(filmes[i])
        }
    }
    res.writeHead(200)
    res.end(JSON.stringify(destaques))
}

  else if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ mensagem: 'API de Filmes funcionando!' }))
  }

  else{
    res.writeHead(404,{ 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ erro: 'Rota não encontrada' }))
  }
})

servidor.listen(3001,() =>{
  console.log('Servidor rodando em http://localhost:3001')
})