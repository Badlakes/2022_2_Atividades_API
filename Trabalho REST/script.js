var editar = false;
var idData = 0;

function buscar(){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var produto = objJSON; 
            console.log( produto );
            var conteudo =  '<table border="1">';
            conteudo +=     '   <tr> ';
            conteudo +=     '       <th>Código</th> ';
            conteudo +=     '       <th>Nome</th> ';
            conteudo +=     '       <th>Preço</th> ';
            conteudo +=     '       <th>Quantidade</th> ';
            conteudo +=     '   </tr>';
            produto.forEach( prod => {
                conteudo += '<tr> ' ;
                conteudo += '   <td>' + prod.id + '</td>';
                conteudo += '   <td>' + prod.produto + '</td>';
                conteudo += '   <td>' + prod.preco + '</td>';
                conteudo += '   <td>' + prod.quantidade + '</td>';
                conteudo += '   <td>' + '<a class="btn btn-default" href="#" role="button" onclick="registrar(' + prod.id + ')">Alterar</a>' + '</td>';
                conteudo += '   <td>' + '<a class="btn btn-default" style="background-color: red;" href="#" role="button" onclick="apagar(' + prod.id + ')">x</a>' + '</td>';
                conteudo += '</tr>';
            });
            conteudo += '</table>'

            document.getElementById("divProdutos").innerHTML = conteudo;
        }

    };
    xHttp.open("GET", "http://localhost:8001/produto", true);
    xHttp.setRequestHeader("Content-type", "application/json");
    xHttp.send();
}

function registrar(id){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var produto = objJSON; 
            console.log( produto );
            document.getElementById('txtNome').value = produto.produto;
            document.getElementById('txtPreco').value = produto.preco;
            document.getElementById('txtQuantidade').value = produto.quantidade;
            //var alterar = '<button onclick="alterar(' + produto.id + ')">Salvar Alteração</button>'
            //document.getElementById("divBotao").innerHTML = alterar;
            idLogin = produto.id;
            editar = true;
        }
    };
    xHttp.open("GET", "http://localhost:8001/produto/"+id);
    xHttp.setRequestHeader("Content-type", "application/json");
    xHttp.send();
}

function alterar(id){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var produto = objJSON; 
            buscar();
            console.log( produto );
        }
    };
    var nome = document.getElementById("txtNome").value;
    var preco = document.getElementById("txtPreco").value;
    var qtd = document.getElementById("txtQuantidade").value;
    var data = JSON.stringify({'produto': nome, 'preco': parseFloat(preco), 'quantidade': parseFloat(qtd) });
    console.log(data);
    xHttp.open("PUT", "http://localhost:8001/produto/"+id);
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
    xHttp.open("DELETE", "http://localhost:8001/produto/"+id);
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
    var preco = document.getElementById("txtPreco").value;
    var qtd = document.getElementById("txtQuantidade").value;

    var data = JSON.stringify({'produto': nome, 'preco': parseFloat(preco), 'quantidade': parseFloat(qtd) });
    console.log( data );

    if(editar){
        xHttp.open("PUT", "http://localhost:8001/produto/"+idData);
        xHttp.setRequestHeader("Content-type", "application/json");
        xHttp.send(data);
        editar = false;
    }else{
        xHttp.open("POST", "http://localhost:8001/produto", true);
        xHttp.setRequestHeader("Content-type", "application/json");
        xHttp.send(data);
    }
}