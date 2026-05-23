const http = require('http')
const filmeRoute = require('./Route/filmeRoute')

const servidor = http.createServer((req, res) => {

    filmeRoute(req, res)
})

servidor.listen(3001, () => {

    console.log('Servidor rodando na porta 3001')
})