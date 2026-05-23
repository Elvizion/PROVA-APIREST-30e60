const http = require('http')
const questao3Route = require('./Route/questao3Route')

const servidor = http.createServer((req, res) => {

    questao3Route(req, res)
})

servidor.listen(3000, () => {

    console.log('Servidor rodando na porta 3000')
})