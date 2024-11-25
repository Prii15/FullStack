// npm init
// npm install express ejs mongodb@4.12 colors
//trabalhando com backend, o js eh executado, e nao linkado em um html
require("colors");
let http = require("http");
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://Prii14:SA8mxj6xEqP23aeG@prii.tq3ri.mongodb.net/?retryWrites=true&w=majority&appName=Prii";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, resp){
    resp.redirect('carros_disponiveis');
})

app.post('/cadastra', function(req, resp){
    let nome = req.body.cadastrar_nome;
    let login = req.body.cadastrar_login;
    let senha = req.body.cadastrar_senha;

    client.db("Prii").collection("users").find(
        {db_login: login}).toArray(function(err, items) {
            console.log(items);
            if (items.length == 0) {
                // salva dados no banco
                client.db("Prii").collection("users").insertOne(
                    { 
                        db_nome: nome,
                        db_login: login,
                        db_senha: senha
                        }, function (err) {
                        if (err) {
                            resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar usuário!"});
                        }
                        else {
                            resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Usuário cadastrado com sucesso!"});     
                        };
                    });
            }
            else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar usuário!"});
            }
            else {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Este nome de usuário já existe!"});       
            };
        });
})

app.post('/login', function(req, resp){
    let login = req.body.logar_login;
    let senha = req.body.logar_senha;
    
    client.db("Prii").collection("users").find(
        {
            db_login: login,
            db_senha: senha
        }).toArray(function(err, items) {
            console.log(items);
            if (items.length == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Usuário ou senha inválidos"});
            }
            else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar usuário!"});
            }
            else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Usuário loggado com sucesso"});       
            };
        });
})

app.get('/cadastrar_carro', function(req, resp){
    let marca = req.query.cadastrar_marca;
    let modelo = req.query.cadastrar_modelo;
    let ano = req.query.cadastrar_ano;
    let qtde = parseInt(req.query.cadastrar_qtde);

    client.db("Prii").collection("carros").find(
        {
            db_marca: marca,
            db_modelo: modelo,
            db_ano: ano
        }).toArray(function(err, items) {
            console.log(items);
            if (items.length == 0) {
                // salva dados no banco
                client.db("Prii").collection("carros").insertOne(
                    {
                        db_marca: marca,
                        db_modelo: modelo,
                        db_ano: ano,
                        db_qtde: qtde,
                        }, function (err) {
                        if (err) {
                            resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar carro!"});
                        }
                        else {
                            resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Carro cadastrado com sucesso!"});     
                        };
                    });
                
            }
            else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar carro!"});
            }
            else {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Este carro já existe!"});       
            };
        });
    
})

app.get('/atualizar_carro', function(req, resp){
    let marca = req.query.buscar_marca;
    let modelo = req.query.buscar_modelo;
    let ano = req.query.buscar_ano;
    let qtde = parseInt(req.query.atualizar_qtde);

    // atualiza quantidade de carros 
    client.db("Prii").collection("carros").updateOne(
        { 
            db_marca: marca,
            db_modelo: modelo,
            db_ano: ano
        },
        { 
            $set: {db_qtde: qtde} 
        }, function (err, result) {
            console.log(result);
            if (result.modifiedCount == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Carro não encontrado!"})
            }else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao atualizar o carro!"})
            }else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Quantidade de carros atualizado com sucesso!"})       
            };
    });
})

app.get('/deletar_carro', function(req, resp){
    let marca = req.query.buscar_marca;
    let modelo = req.query.buscar_marca;
    let ano = req.query.buscar_ano;

    client.db("Prii").collection("carros").deleteOne(
        { 
            db_marca: marca,
            db_modelo: modelo,
            db_ano: ano
        } , function (err, result) {
            console.log(result);
            if (result.deletedCount == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Carro não encontrado!"})
            }else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao deletar Carro!"})
            }else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Carro deletado com sucesso!"})       
            };
        });

})

app.get('/carros_disponiveis', function (req, resp){
    client.db("Prii").collection("carros").find({
    }).toArray(function(err, carros) {
        if (err) {
            resp.render('resposta.ejs', { resposta: "Falha!", mensagem: "Erro ao buscar carros!" });
        }
        else {
            resp.render('carros_disponiveis.ejs', {
                carros
            });
        }
    });
});

app.post('/vender', function (req, resp) {
    let marca = req.body.marca;
    let modelo = req.body.modelo;
    let ano = req.body.ano;

    client.db("Prii").collection("carros").updateOne(
        { 
            db_marca: marca, db_modelo: modelo, db_ano: ano, db_qtde: { $gt: 0 } 
        },
        { $inc: {db_qtde: -1} }, function (err, result) {
        console.log(result)
        if (err) {
            resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao comprar carro!"})
        }else if (result.modifiedCount == 0) {
            client.db("Prii").collection("carros").find(
                {
                    db_marca: marca,
                    db_modelo: modelo,
                    db_ano: ano
                }).toArray(function(err, items) {
                    console.log(items);
                    if (items.length == 0) {
                        resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Este carro não existe, verifique e tente novamente!"});
                    }
                    else if (err) {
                        resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao comprar carro!"});
                    }
                    else {
                        resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Este carro está esgotado!"})       
                    };
                });
            
        }else {
            resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Compra feita com sucesso!"})    
        };
    });
});

let server = http.createServer(app);

server.listen(80);

console.log("servidor rodando...");