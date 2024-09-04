const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 80;

app.use(express.json());
app.use(cookieParser());

// Rota POST para criar um cookie
app.post('/cookie/criar', (req, res) => {
    const { nome, valor } = req.body;
    if (!nome || !valor) {
        return res.status(400).json({
            mensagem: 'Nome e valor do cookie são necessários',
            cod_status: 400
        });
    }
    res.cookie(nome, valor);
    res.status(201).json({
        mensagem: 'Cookie criado com sucesso',
        cod_status: 201
    });
});

// Rota GET para ler um cookie
app.get('/cookie/ler', (req, res) => {
    const cookies = req.cookies;
    if (Object.keys(cookies).length === 0) {
        return res.status(404).json({
            mensagem: 'Nenhum cookie encontrado',
            cod_status: 404
        });
    }
    const cookieName = Object.keys(cookies)[0];
    const cookieValue = cookies[cookieName];
    res.status(200).json({
        mensagem: `O nome do cookie criado foi ${cookieName} e valor ${cookieValue}`,
        cod_status: 200
    });
});

// Rota PUT para atualizar um cookie
app.put('/cookie/atualizar', (req, res) => {
    const { nome, novoValor } = req.body;
    if (!nome || !novoValor) {
        return res.status(400).json({
            mensagem: 'Nome e novo valor do cookie são necessários',
            cod_status: 400
        });
    }
    res.cookie(nome, novoValor);
    res.status(201).json({
        mensagem: `O novo valor do cookie é ${novoValor}`,
        cod_status: 201
    });
});

// Rota DELETE para excluir um cookie
app.delete('/cookie/excluir', (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({
            mensagem: 'Nome do cookie é necessário',
            cod_status: 400
        });
    }
    res.clearCookie(nome);
    res.status(201).json({
        mensagem: 'Cookie excluído com sucesso',
        cod_status: 201
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
