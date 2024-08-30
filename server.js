const express = require('express');
const api = express();
const porta = 80;

api.get('/', (req, res) => {
    const rotaPadrao = {
        nome_rota: '/',
        codigo_status: '200',
        metodo: 'GET'
    };

    res.status(200).json(rotaPadrao);
});

// Cria clientes
api.post('/clientes', (req, res) => {
    const response = [
        {
            mensagem: 'Cliente criado com sucesso',
            status: 201
        }
    ];

    res.status(201).json(response);
});

// Atualiza cliente
api.put('/clientes/update/cpfcnpj/12345678901', (req, res) => {
    const response = [
        {
            mensagem: 'Cliente atualizado com sucesso',
            status: 200
        }
    ];

    res.status(200).json(response);
});

// Deleta cliente
api.delete('/clientes/delete/cpfcnpj/12345678901', (req, res) => {
    const response = [
        {
            mensagem: 'Cliente deletado com sucesso',
            status: 200
        }
    ];

    res.status(200).json(response);
});

api.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
