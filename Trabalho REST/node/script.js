function buscar(){
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var produtos = objJSON.produtos; 
            var conteudo =  '<table border="1">';
            conteudo +=     '   <tr> ';
            conteudo +=     '       <th>Código</th> ';
            conteudo +=     '       <th>Nome</th> ';
            conteudo +=     '       <th>Preço</th> ';
            conteudo +=     '       <th>Quantidade</th> ';
            conteudo +=     '   </tr>';
            produtos.forEach( prod => {
                conteudo += '<tr> ' ;
                conteudo += '   <td>' + prod.id + '</td>';
                conteudo += '   <td>' + prod.nome + '</td>';
                conteudo += '   <td>' + prod.preco + '</td>';
                conteudo += '   <td>' + prod.quantidade + '</td>';
                conteudo += '</tr>';
            });
            conteudo += '</table>'

            document.getElementById("divProdutos").innerHTML = conteudo;
        }

    };
    xHttp.open("POST", "servidor.php?listar", true);
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
    xHttp.open("POST", "http://localhost:8001/produto" + nome +
                        "&preco=" + preco + "&quantidade=" + qtd, true);
    xHttp.send();
}