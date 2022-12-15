const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2')
const errors = require("restify-errors");

const servidor = restify.createServer({
    name : 'Lojinha' ,
    version : '1.0.0'
});

const cors = corsMiddleware({
    origins: ['*'],
  })
servidor.use( restify.plugins.acceptParser(servidor.acceptable) );
servidor.use( restify.plugins.queryParser() );
servidor.use( restify.plugins.bodyParser() );
servidor.pre(cors.preflight)
servidor.use(cors.actual)

servidor.listen(8001, function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
} );


const knex = require("knex")({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database : 'lojinha'
    }
});

servidor.get("/" , (req, res) => {
    res.send("Bem-vindo à nossa Lojinha!");
});

servidor.get("/produto" , (req, res, next) => {
    knex('produto').then( (dados)=>{
        res.send( dados );
    } , next );
});

servidor.get("/produto/:idProd" , (req, res, next) => {
    const idProduto = req.params.idProd;
    knex('produto')
        .where('id' , idProduto )
        .first()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Produto não encontrado!') );
            }
            res.send( dados );
        } , next );
});

servidor.del("/produto/:idProd", (req, res, next) => {
    const idProduto = req.params.idProd;
    knex('produto')
        .where('id' , idProduto )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Produto não encontrado!') );
            }
            res.send( "Produto deletado" );
        } , next );
} );

servidor.put("/produto/:idProd", (req, res, next) => {
    const idProduto = req.params.idProd;
    knex('produto')
        .where('id' , idProduto )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Produto não encontrado!') );
            }
            res.send( "Produto editado" );
        } , next );
} );



servidor.post("/produto", (req, res, next) => {
    console.log( req );
    knex('produto')
        .insert( req.body )
        .then( (dados)=>{
            res.send( "Produto inserido" );
        } , next );
} );