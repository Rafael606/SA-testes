const express = require('express');
const app = express();

// Middleware de autenticação simulada
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader === 'token_valido') {
        next();
    } else {
        res.status(401).json({
            mensagem: "acesso nao autorizado",
            cod_status: 401
        }); 
    }
}

// Endpoint protegido pela autenticação
app.get('/Home', authenticate, (req, res) => {
    res.status(200).json({
        mensagem: "acesso autorizado",
        cod_status: 200
    });
});

// Iniciar o servidor
const PORT = 80;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
