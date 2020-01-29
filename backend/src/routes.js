const { Router } = require('express')
const routes = new Router()
const multer = require('multer')
const UsuarioController = require('./controllers/UsuarioController')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)

routes.get('/usuarios', UsuarioController.index)
routes.get('/usuarios/:id', UsuarioController.show)
routes.post('/usuarios', upload.single('foto'), UsuarioController.store)
routes.put('/usuarios/:id', upload.single('foto'), UsuarioController.update )
routes.delete('/usuarios/:id', UsuarioController.delete)

module.exports = routes