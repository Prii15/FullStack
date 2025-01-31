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
    resp.redirect('Site copy/HOME/home.html');
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
//FIM DA ENTREGA 08

//BANCO DE DADOS - FUNÇÕES
app.get('/cadastrar_livro', function(req, resp){
    let nome = req.query.cadastra_nome;
    let autor = req.query.cadastra_autor;
    let isbn = req.query.cadastra_isbn;
    let editora = req.query.cadastra_editora;
    let data = req.query.cadastra_data;

    console.log(nome, autor, isbn, editora, data);

    // salva dados no banco
    client.db("Prii").collection("livros").insertOne(
    { 
        db_nome: nome,
        db_autor: autor,
        db_isbn: isbn,
        db_editora: editora,
        db_data: data
        }, function (err) {
        if (err) {
            resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar livro!"});
        }
        else {
            resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Livro cadastrado com sucesso!"});     
        };
    });
})

app.get('/buscar_livro_nome', function(req, resp){
    let nome = req.query.buscar_nome;

    // busca um usuário no banco de dados
    client.db("Prii").collection("livros").find(
        {db_nome: nome}).toArray(function(err, items) {
            console.log(items);
            if (items.length == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Livro não encontrado!"});
            }
            else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao buscar livro!"});
            }
            else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: items.length + " livro(s) encontrado(s)!"});       
            };
        });
})

app.get('/buscar_livro_isbn', function(req, resp){
    let isbn = req.query.buscar_isbn;

    // busca um usuário no banco de dados
    client.db("Prii").collection("livros").find(
        {db_isbn: isbn}).toArray(function(err, items) {
            console.log(items);
            if (items.length == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Livro não encontrado!"});
            }
            else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao buscar livro!"});
            }
            else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: items.length + " livro(s) encontrado(s)!"});     
            };
        });
})

app.get('/atualizar_editora_livro', function(req, resp){
    let isbn = req.query.buscar_isbn;
    let editora = req.query.atualizar_editora;

    // atualiza editora do livro do usuário
    client.db("Prii").collection("livros").updateOne(
        { 
            db_isbn: isbn
        },
        { 
            $set: {db_editora: editora} 
        }, function (err, result) {
            console.log(result);
            if (result.modifiedCount == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Livro não encontrado!"})
            }else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao atualizar livro!"})
            }else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Livro atualizado com sucesso!"})       
            };
    });
})

app.get('/deletar_livro', function(req, resp){
    let isbn = req.query.buscar_isbn;

    // remove livro (apenas 1, pq eh deleteOne, se fosse delete removia todos que encontrasse)
    client.db("Prii").collection("livros").deleteOne(
        { 
            db_isbn: isbn
        } , function (err, result) {
            console.log(result);
            if (result.deletedCount == 0) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Livro não encontrado!"})
            }else if (err) {
                resp.render('resposta.ejs', {resposta: "Falha!", mensagem: "Erro ao deletar livro!"})
            }else {
                resp.render('resposta.ejs', {resposta: "Sucesso!", mensagem: "Livro deletado com sucesso!"})       
            };
        });

})
//FIM DA AULA DE BANCO DE DADOS

//ENTREGA 09 - BLOG
app.get('/cadastrar_post', function(req, resp){
    let titulo = req.query.cadastra_titulo;
    let resumo = req.query.cadastra_resumo;
    let conteudo = req.query.cadastra_conteudo;

    client.db("Prii").collection("posts_blog").insertOne(
        { 
            db_titulo: titulo,
            db_resumo: resumo,
            db_conteudo: conteudo
            }, function (err) {
            if (err) {
                resp.render('resposta_blog.ejs', {resposta: "Falha!", mensagem: "Erro ao cadastrar post!"})
            }
            else {
                resp.render('resposta_blog.ejs', {resposta: "Sucesso!", mensagem: "Post cadastrado com sucesso!"})       
            };
        });
})


app.get('/blog', function (req, resp){
    client.db("Prii").collection("posts_blog").find({}).toArray(function(err, posts) {
        if (err) {
            resp.render('resposta.ejs', { resposta: "Falha!", mensagem: "Erro ao buscar posts!" });
        }
        else {
            resp.render('blog.ejs', {
                posts
            });
        }
        
    });
});
//FIM DA ENTREGA 09


let server = http.createServer(app);

server.listen(80);

console.log("servidor rodando...");

//console.log("Olá mundo".rainbow);