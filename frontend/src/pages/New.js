import React, { Component } from 'react';
import api from '../services/api'
import './New.css'

class New extends Component {
    state = {
        foto: null,
        nome: '',
        email: '',
        cpf: '',
        senha: '',
    }

    handleSubmit = async e => {
        e.preventDefault()
        const data = new FormData()
        const { foto, nome, email, cpf, senha } = this.state
        
        data.append('foto', foto)
        data.append('nome', nome)
        data.append('email', email)
        data.append('cpf', cpf)
        data.append('senha', senha)

        await api.post('/usuarios', data)
        this.props.history.push('/')
        console.log(this.state)
    }

    handleImageChange = e => {
        this.setState({foto: e.target.files[0]})
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form id='new-post' onSubmit={this.handleSubmit}>
                <input type='file' onChange={this.handleImageChange}/>
                <input type='text' name='nome' placeholder='Nome de usuario' onChange={this.handleChange} value={this.state.nome}/>
                <input type='text' name='email' placeholder='Seu email' onChange={this.handleChange} value={this.state.email}/>
                <input type='text' name='cpf' placeholder='Seu CPF' onChange={this.handleChange} value={this.state.cpf}/>
                <input type='text' name='senha' placeholder='Sua senha' onChange={this.handleChange} value={this.state.senha}/>
                <button type='submit'>Enviar</button>
            </form>
        )
    }
}

export default New