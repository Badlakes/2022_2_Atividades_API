var editar = false;
var idLogin = 0;


function buscar(){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var login = objJSON; 
            console.log( login );
            var conteudo =  '<table border="1">';
            conteudo +=     '   <tr> ';
            conteudo +=     '       <th>ID</th> ';
            conteudo +=     '       <th>Nome</th> ';
            conteudo +=     '       <th>Email</th> ';
            conteudo +=     '   </tr>';
            login.forEach( prod => {
                conteudo += '<tr> ' ;
                conteudo += '   <td>' + prod.id + '</td>';
                conteudo += '   <td>' + prod.nome + '</td>';
                conteudo += '   <td>' + prod.email + '</td>';
                conteudo += '   <td>' + '<a class="btn btn-default" href="#" role="button" onclick="registrar(' + prod.id + ')">Alterar</a>' + '</td>';
                conteudo += '   <td>' + '<a class="btn btn-default" style="background-color: red;" href="#" role="button" onclick="apagar(' + prod.id + ')">x</a>' + '</td>';
                conteudo += '</tr>';
            });
            conteudo += '</table>'

            document.getElementById("divlogin").innerHTML = conteudo;
        }

    };
    xHttp.open("GET", "http://localhost:8002/login", true);
    xHttp.setRequestHeader("Content-type", "application/json");
    xHttp.send();
}

function registrar(id){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var login = objJSON; 
            console.log( login );
            document.getElementById('txtNome').value = login.nome;
            document.getElementById('txtEmail').value = login.email;
            //var alterar = '<button onclick="alterar(' + login.id + ')">Salvar Alteração</button>'
            //document.getElementById("divBotao").innerHTML = alterar;
            idLogin = login.id;
            editar = true;
        }
    };
    xHttp.open("GET", "http://localhost:8002/login/"+id);
    xHttp.setRequestHeader("Content-type", "application/json");
    xHttp.send();
}

function alterar(id){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var login = objJSON; 
            buscar();
            console.log( login );
        }
    };
    var nome = document.getElementById("txtNome").value;
    var email = document.getElementById("txtEmail").value;
    var data = JSON.stringify({'nome': nome, 'email': email});
    console.log(data);
    xHttp.open("PUT", "http://localhost:8002/login/"+id);
    xHttp.setRequestHeader("Content-type", "application/json");
    xHttp.send(data);
}

function apagar(id){
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            buscar();
        }
    
    };
    xHttp.open("DELETE", "http://localhost:8002/login/"+id);
    xHttp.send();
}



function salvar(){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            buscar();
        }

    };

    var nome = document.getElementById("txtNome").value;
    var email = document.getElementById("txtEmail").value;
    var data = JSON.stringify({'nome': nome, 'email': email});
    console.log( data );

    if( editar ){
        xHttp.open("PUT", "http://localhost:8002/login/"+idLogin);
        xHttp.setRequestHeader("Content-type", "application/json");
        xHttp.send(data);
        editar = false;
    }else{
        xHttp.open("POST", "http://localhost:8002/login", true);
        xHttp.setRequestHeader("Content-type", "application/json");
        xHttp.send(data);
    }

    

   
}