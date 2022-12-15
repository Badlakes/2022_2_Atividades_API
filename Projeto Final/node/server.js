const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2')
const errors = require("restify-errors");

const servidor = restify.createServer({
    name : 'login' ,
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

servidor.listen(8002, function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
} );


const knex = require("knex")({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database : 'login'
    }
});

servidor.get("/" , (req, res) => {
    res.send("Site de login SEGURO!");
});

servidor.get("/login" , (req, res, next) => {
    knex('login').then( (dados)=>{
        res.send( dados );
    } , next );
});

servidor.get("/login/:idProd" , (req, res, next) => {
    const idlogin = req.params.idProd;
    knex('login')
        .where('id' , idlogin )
        .first()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('login não encontrado!') );
            }
            res.send( dados );
        } , next );
});

servidor.del("/login/:idProd", (req, res, next) => {
    const idlogin = req.params.idProd;
    knex('login')
        .where('id' , idlogin )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('login não encontrado!') );
            }
            res.send( "login deletado" );
        } , next );
} );

servidor.put("/login/:idProd", (req, res, next) => {
    const idlogin = req.params.idProd;
    knex('login')
        .where('id' , idlogin )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('login não encontrado!') );
            }
            res.send( "login editado" );
        } , next );
} );



servidor.post("/login", (req, res, next) => {
    console.log( req );
    knex('login')
        .insert( req.body )
        .then( (dados)=>{
            res.send( "login inserido" );
        } , next );
} );