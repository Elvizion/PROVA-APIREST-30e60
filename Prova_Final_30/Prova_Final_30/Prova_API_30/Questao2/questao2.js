const http = require('http')
const questao2Route = require('./Route/questao2Route')

const servidor = http.createServer((req, res) => {

    questao2Route(req, res)
})

servidor.listen(3000, () => {

    console.log('Servidor rodando na porta 3000')
})