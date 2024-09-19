const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2');
const app = express();

// Middleware para permitir requisições com JSON
app.use(express.json());

app.use(cors());  // Habilitar CORS para todas as rotas

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Coloque seu usuário do MySQL
  port: '3306',
  password: 'root',  // Coloque sua senha do MySQL
  database: 'vendaCarros'  // O nome do banco de dados que você criou
});

// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Rotas CRUD

// 1. Clientes

// GET - Listar todos os clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM Clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Adicionar um novo cliente
app.post('/clientes', (req, res) => {
  const { Nome, CPF, Endereco, Telefone, Email } = req.body;
  const sql = 'INSERT INTO Clientes (Nome, CPF, Endereco, Telefone, Email) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [Nome, CPF, Endereco, Telefone, Email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Cliente adicionado', id: result.insertId });
  });
});

// PUT - Atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { Nome, CPF, Endereco, Telefone, Email } = req.body;
  const sql = 'UPDATE Clientes SET Nome = ?, CPF = ?, Endereco = ?, Telefone = ?, Email = ? WHERE ID = ?';
  db.query(sql, [Nome, CPF, Endereco, Telefone, Email, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Cliente atualizado' });
  });
});

// DELETE - Remover um cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Clientes WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Cliente removido' });
  });
});

// 2. Carros

// GET - Listar todos os carros
app.get('/carros', (req, res) => {
  db.query('SELECT * FROM Carros', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Adicionar um novo carro
app.post('/carros', (req, res) => {
  const { ModeloID, Ano, Preco, Cor, Quilometragem } = req.body;
  const sql = 'INSERT INTO Carros (ModeloID, Ano, Preco, Cor, Quilometragem) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [ModeloID, Ano, Preco, Cor, Quilometragem], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Carro adicionado', id: result.insertId });
  });
});

// PUT - Atualizar um carro existente
app.put('/carros/:id', (req, res) => {
  const { id } = req.params;
  const { ModeloID, Ano, Preco, Cor, Quilometragem } = req.body;
  const sql = 'UPDATE Carros SET ModeloID = ?, Ano = ?, Preco = ?, Cor = ?, Quilometragem = ? WHERE ID = ?';
  db.query(sql, [ModeloID, Ano, Preco, Cor, Quilometragem, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Carro atualizado' });
  });
});

// DELETE - Remover um carro
app.delete('/carros/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Carros WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Carro removido' });
  });
});

// 3. Vendedores

// GET - Listar todos os vendedores
app.get('/vendedores', (req, res) => {
  db.query('SELECT * FROM Vendedores', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Adicionar um novo vendedor
app.post('/vendedores', (req, res) => {
  const { Nome, CPF, Endereco, Telefone, Email } = req.body;
  const sql = 'INSERT INTO Vendedores (Nome, CPF, Endereco, Telefone, Email) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [Nome, CPF, Endereco, Telefone, Email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Vendedor adicionado', id: result.insertId });
  });
});

// PUT - Atualizar um vendedor existente
app.put('/vendedores/:id', (req, res) => {
  const { id } = req.params;
  const { Nome, CPF, Endereco, Telefone, Email } = req.body;
  const sql = 'UPDATE Vendedores SET Nome = ?, CPF = ?, Endereco = ?, Telefone = ?, Email = ? WHERE ID = ?';
  db.query(sql, [Nome, CPF, Endereco, Telefone, Email, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Vendedor atualizado' });
  });
});

// DELETE - Remover um vendedor
app.delete('/vendedores/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Vendedores WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Vendedor removido' });
  });
});

// 4. Vendas

// GET - Listar todas as vendas
app.get('/vendas', (req, res) => {
  db.query('SELECT * FROM Vendas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Registrar uma nova venda
app.post('/vendas', (req, res) => {
  const { CarroID, ClienteID, VendedorID, DataVenda, PrecoVenda, TipoPagamento, NumParcelas } = req.body;
  const sql = 'INSERT INTO Vendas (CarroID, ClienteID, VendedorID, DataVenda, PrecoVenda, TipoPagamento, NumParcelas) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [CarroID, ClienteID, VendedorID, DataVenda, PrecoVenda, TipoPagamento, NumParcelas], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Venda registrada', id: result.insertId });
  });
});

// PUT - Atualizar uma venda existente
app.put('/vendas/:id', (req, res) => {
  const { id } = req.params;
  const { CarroID, ClienteID, VendedorID, DataVenda, PrecoVenda, TipoPagamento, NumParcelas } = req.body;
  const sql = 'UPDATE Vendas SET CarroID = ?, ClienteID = ?, VendedorID = ?, DataVenda = ?, PrecoVenda = ?, TipoPagamento = ?, NumParcelas = ? WHERE ID = ?';
  db.query(sql, [CarroID, ClienteID, VendedorID, DataVenda, PrecoVenda, TipoPagamento, NumParcelas, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Venda atualizada' });
  });
});

// DELETE - Remover uma venda
app.delete('/vendas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Vendas WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Venda removida' });
  });
});

// Configurar o servidor para escutar na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
