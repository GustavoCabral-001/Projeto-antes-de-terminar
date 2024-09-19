-- Criação da tabela Carros
CREATE TABLE Carros (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Marca VARCHAR(255),
    Modelo VARCHAR(255),
    Ano INT,
    Preco DECIMAL(10, 2),
    Cor VARCHAR(255),
    Quilometragem INT
);

-- Criação da tabela Clientes
CREATE TABLE Clientes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    CPF VARCHAR(14),
    Endereco VARCHAR(255),
    Telefone VARCHAR(20)
);

-- Criação da tabela Vendedores
CREATE TABLE Vendedores (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    CPF VARCHAR(14),
    Endereco VARCHAR(255),
    Telefone VARCHAR(20)
);

-- Criação da tabela Vendas
CREATE TABLE Vendas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CarroID INT,
    ClienteID INT,
    VendedorID INT,
    DataVenda DATE,
    PrecoVenda DECIMAL(10, 2),
    FOREIGN KEY (CarroID) REFERENCES Carros(ID),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ID),
    FOREIGN KEY (VendedorID) REFERENCES Vendedores(ID)
);

-- Inserção de dados na tabela Carros
INSERT INTO Carros (Marca, Modelo, Ano, Preco, Cor, Quilometragem) VALUES ('Fiat', 'Uno', 2020, 35000.00, 'Vermelho', 50000),
    ('Chevrolet', 'Onix', 2021, 45000.00, 'Preto', 30000),('Volkswagen', 'Gol', 2019, 28000.00, 'Branco', 40000);

-- Inserção de dados na tabela Clientes
INSERT INTO Clientes (Nome, CPF, Endereco, Telefone) VALUES ('João Silva', '123.456.789-00', 'Rua Exemplo, 100', '(83) 90000-0000'),
    ('Carlos Pereira', '222.333.444-55', 'Rua Exemplo 2, 250', '(83) 92222-2222'),('Carlos Pereira', '222.333.444-55', 'Rua Exemplo 2, 250', '(83) 92222-2222');

-- Inserção de dados na tabela Vendedores
INSERT INTO Vendedores (Nome, CPF, Endereco, Telefone) VALUES ('Maria Souza', '987.654.321-00', 'Avenida Exemplo, 200', '(83) 98888-8888'),
    ('Pedro Alves', '444.555.666-77', 'Rua Exemplo 3, 400', '(83) 94444-4444'),('Juliana Martins', '333.444.555-66', 'Avenida Exemplo 3, 500', '(83) 95555-5555');

-- Inserção de dados na tabela Vendas
INSERT INTO Vendas (CarroID, ClienteID, VendedorID, DataVenda, PrecoVenda) VALUES (1, 1, 1, '2024-06-18', 33000.00),(2, 2, 2, '2024-06-19', 43000.00),(3, 3, 3, '2024-06-20', 27000.00);

-- Select para visualizar todos os carros
SELECT * FROM Carros;

-- Select para visualizar todas as vendas com informações completas
SELECT 
    V.ID AS VendaID,
    C.Marca,
    C.Modelo,
    C.Ano,
    C.Cor,
    C.Quilometragem,
    Cl.Nome AS NomeCliente,
    Ve.Nome AS NomeVendedor,
    V.DataVenda,
    V.PrecoVenda
FROM 
    Vendas AS V
JOIN Carros AS C ON V.CarroID = C.ID
JOIN Clientes AS Cl ON V.ClienteID = Cl.ID
JOIN Vendedores AS Ve ON V.VendedorID = Ve.ID;

-- Select para visualizar carros de uma marca específica
SELECT * FROM Carros WHERE Marca = 'Fiat';

-- Select para visualizar vendas em um intervalo de datas
SELECT * FROM Vendas WHERE DataVenda BETWEEN '2024-01-01' AND '2024-12-31';

-- Select para visualizar vendas com preço de venda acima de um valor específico
SELECT * FROM Vendas WHERE PrecoVenda > 40000.00;

-- Select para visualizar a quantidade de carros vendidos por vendedor
SELECT 
    Vendedores.Nome,
    COUNT(Vendas.ID) AS QuantidadeVendas
FROM 
    Vendedores
JOIN Vendas ON Vendedores.ID = Vendas.VendedorID
GROUP BY Vendedores.Nome;

-- Select para visualizar a média de preços dos carros vendidos por ano
SELECT 
    Carros.Ano,
    AVG(Vendas.PrecoVenda) AS PrecoMedioVenda
FROM 
    Carros
JOIN Vendas ON Carros.ID = Vendas.CarroID
GROUP BY Carros.Ano;

