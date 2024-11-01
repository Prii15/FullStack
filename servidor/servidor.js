//trabalhando com backend, o js eh executado, e nao linkado em um html
require("colors");

let http = require("http");
let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, resp){
    resp.redirect('Site copy/HOME/project.html');
})

//AULAS 09 E 10
app.get('/cadastrar', function(req, resp){
    //cary pega o que ta na url
    let nome = req.query.cadastrar_nome;
    let login = req.query.cadastrar_login;
    let nascimento = req.query.cadastrar_nascimento;
    let senha = req.query.cadastrar_senha;

    console.log(nome, login, nascimento, senha, "GET");
    resp.redirect('Aula_9_e_10/success.html');

})

app.post('/cadastrar', function(req, resp){
    let nome = req.body.cadastrar_nome;
    let login = req.body.cadastrar_login;
    let nascimento = req.body.cadastrar_nascimento;
    let senha = req.body.cadastrar_senha;

    console.log(nome, login, nascimento, senha, "POST");
    //redirect eh para paginas estaticas
    resp.redirect('Aula_9_e_10/success.html');
})

app.post('/logar', function(req, resp){
    let login = req.body.logar_login;
    let senha = req.body.logar_senha;
    console.log(login, senha);

    //resposta do banco de dados falso
    let resp_bd = false;
    if(resp_bd == true){
        //render eh para paginas dinamicas
        resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Usuário cadastrado com sucesso!"})
    }
    else{
        resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Login ou senha inválidos!"})
    }

})

app.get('/divs', function(req, resp){
    //cary pega o que ta na url
    let qtde = req.query.qtde;

    resp.render('divs.ejs', {quantidade: qtde});
})
// FIM DAS AULAS 09 E 10

let cadastros = [];
let achouCadastro = false;

// ENTREGA 08 GET - POST - TEMPLATE
app.post('/cadastra', function(req, resp){
    let novoCadastro = {
        nome: req.body.cadastrar_nome,
        login: req.body.cadastrar_login,
        senha: req.body.cadastrar_senha
    };

    cadastros.forEach(cadastro =>{
        if(cadastro.login == novoCadastro.login){
            achouCadastro = true;
            resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Usuário já cadastrado!"})
        }
    })

    if(achouCadastro == false){
        cadastros.push(novoCadastro);

        resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Usuário cadastrado com sucesso!"})
    }
    
})

app.post('/login', function(req, resp){
    let login = req.body.logar_login;
    let senha = req.body.logar_senha;
    console.log(login, senha);
    
    cadastros.forEach(cadastro =>{
        if(cadastro.login == login && cadastro.senha == senha){
            achouCadastro = true;
            resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Usuário loggado com sucesso!"})
        }

    })

    if(achouCadastro == false){
        resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Login ou senha inválidos!"})
    }
})


let server = http.createServer(app);

server.listen(80);

console.log("servidor rodando...");

//console.log("Olá mundo".rainbow);