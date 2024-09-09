const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 80;

// Middleware para lidar com requisições JSON
app.use(bodyParser.json());

// Chave secreta para assinar os tokens JWT
const SECRET_KEY = "minhaChave";

// Simulação de banco de dados de usuários
const usuarios = [
  { usuario: "user1", senha: "password1" },
  { usuario: "user2", senha: "password2" },
];

// Endpoint para autenticação e geração do JWT
app.post("/auth/login", (req, res) => {
  const { usuario, senha } = req.body;

  // Verificar se o usuário existe
  const user = usuarios.find((u) => u.usuario === usuario && u.senha === senha);

  if (user) {
    // Gerar o token JWT
    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: "1h" });

    // Retornar o token no corpo da resposta
    res.json({ token });
  } else {
    // Usuário não encontrado ou senha incorreta
    res.status(401).json({ mensagem: "Usuário ou senha incorretos" });
  }
});

// Middleware para verificar o token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    // Verificar o token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensagem: "Token inválido" });
      } else {
        // Se o token for válido, prosseguir para o próximo middleware
        req.usuario = decoded.usuario;
        next();
      }
    });
  } else {
    return res.status(403).json({ mensagem: "Token não fornecido" });
  }
};

// Simulação de lista de produtos
const produtos = [
  { id: 1, nome: "escova de dente", preco: "10.00" },
  { id: 2, nome: "shampoo", preco: "40.00" },
];

// Endpoint protegido para listar produtos
app.get("/produtos", verificarToken, (req, res) => {
  res.json({ produtos });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
