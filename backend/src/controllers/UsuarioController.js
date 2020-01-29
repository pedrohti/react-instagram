const Usuario = require('../models/Usuario')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
    //Lista os usuarios
    async index(req, res) { 
        const usuarios = await Usuario.find().sort('nome')
        return res.json(usuarios)
        req.io.emit('user', usuarios)
    },

    //Grava os usuarios
    async store(req, res) {
        const { nome, email, senha, cpf } = req.body
        //console.log(req.body)
        const { filename: foto } = req.file
        const [ name, ext ] = foto.split('.')
        const fileName = `${name}.jpg`

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, 'resizes', fileName))
        
        fs.unlinkSync(req.file.path)

        const usuarioCPF = await Usuario.find({ cpf: cpf })
        const usuarioEmail = await Usuario.find({ email: email })

        if (usuarioCPF == false) {
            if (usuarioEmail == false) {
                const usuario = await Usuario.create({
                    nome,
                    email,
                    senha,
                    cpf,
                    foto: fileName
                })
                console.log("CADASTRADO")
                req.io.emit('user', usuario)
                return res.json(usuario)
            } else {
                console.log("EMAIL JA EXISTE", email)
                return res.status(401).json({error: 'Email Existente'})
            }
        } else {
            console.log("CPF JA EXISTE", cpf)
            return res.status(401).json({error: 'CPF Existente'})
        }
    },

    //lista 1
    async show(req, res) {
        const id = req.params.id
        const user = await Usuario.find({_id: id})
        return res.json(user)
    },

    async update(req, res) {
        const { id } = req.params
        const { nome, email, senha, cpf } = req.body
        const { filename: foto } = req.file
        const [ name, ext ] = foto.split('.')
        const fileName = `${name}.jpg`

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, 'resizes', fileName))
        
        fs.unlinkSync(req.file.path)

        const dados = {
            nome,
            email,
            senha,
            cpf,
            foto: fileName
        }

        const usuarioCPF = await Usuario.find({ cpf: dados.cpf })
        const usuarioEmail = await Usuario.find({ email: dados.email })

        if (usuarioCPF == false) {
            if (usuarioEmail == false) {
                const usuario = await Usuario.findOneAndUpdate(id, dados, { new: true })
                console.log("CADASTRADO")
                return res.json(usuario)
            } else {
                console.log("EMAIL JA EXISTE", email)
                return res.status(401).json({error: 'Email Existente'})
            }
        } else {
            console.log("CPF JA EXISTE", cpf)
            return res.status(401).json({error: 'CPF Existente'})
        }

        req.io.emit('Usuario', usuario)
    },

    async delete(req, res) {
        const id = req.params.id;
        const user = await Usuario.findOneAndDelete({ _id: id })
        return res.send("Deletado com Sucesso!")
    },
} 