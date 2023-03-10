const { Router } = require('express')
const routes = Router();
const clientController = require('./modules/Cliente/ClienteControler')
const livroController = require('./modules/Livros/LivroControler')
const aluguelController = require('./modules/Alguel/AluguelControler')

routes.get('/',(req,res)=>{
    return res.json("Server Up")
})

routes.get('/cliente',clientController.get)
routes.post('/cliente',clientController.create)


routes.get('/livros',livroController.get)
routes.post('/livros',livroController.create)
routes.put('/livros/:id',livroController.putIsAlterado)

routes.get('/aluguel',aluguelController.get)
routes.post('/aluguel',aluguelController.create)
routes.delete('/aluguel/:id',aluguelController.deletar)
routes.put('/aluguel',aluguelController.put)


routes.get('/aluguel/hst/:id',aluguelController.getHst)
module.exports = {routes}