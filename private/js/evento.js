
const formEvento = document.getElementById('formEvento');

formEvento.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:3024/eventos';
buscarTodosEventos();

var motivoAcao = "CADASTRAR";

function gravarEvento(){
    const objetoEvento = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        local: document.getElementById('local').value,
        valor: document.getElementById('valor').value,
        ingresso: document.getElementById('ingresso').value
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}

function selecionarEvento(titulo, descricao, data, horario, local, valor, ingresso, motivo) {
    document.getElementById('titulo').value = titulo;
    document.getElementById('descricao').value = descricao;
    document.getElementById('data').value = data;
    document.getElementById('horario').value = horario;
    document.getElementById('local').value = local;
    document.getElementById('valor').value = valor;
    document.getElementById('ingresso').value = ingresso;


    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }


}

function excluirEvento(){

    fetch(enderecoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({titulo: document.getElementById('titulo').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function atualizarEvento(){

    const objetoEvento = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        local: document.getElementById('local').value,
        valor: document.getElementById('valor').value,
        ingresso: document.getElementById('ingresso').value
    }


    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}

function buscarTodosEventos(){
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaEventos(respostaAPI.listaEventos);
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    })
    .catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function validarCampos(evento){

    const titulo   = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const data     = document.getElementById('data').value;
    const horario  = document.getElementById('horario').value;
    const local    = document.getElementById('local').value;
    const valor    = document.getElementById('valor').value;
    const ingresso = document.getElementById('ingresso').value;


    //impedem que o navegador continue o processo de submissão do formulário
    evento.stopPropagation();
    evento.preventDefault();

    if (titulo && descricao && data && horario && local && valor && ingresso) {
        if (motivoAcao == "CADASTRAR"){
            gravarEvento();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarEvento();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirEvento();
            motivoAcao = "CADASTRAR";
        }
        
        formEvento.reset();
        buscarTodosEventos();
        return true;
    }
    else{
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}


function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaEventos(listaEventos){
    if (listaEventos.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Local</th>
                <th>Valor (R$)</th>
                <th>Capacidade</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const evento of listaEventos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.titulo}</td>
                <td>${evento.descricao}</td>
                <td>${evento.data}</td>
                <td>${evento.horario}</td>
                <td>${evento.local}</td>
                <td>${evento.valor}</td>
                <td>${evento.ingresso}</td>
                <td>
                    <button onclick="selecionarCliente('${evento.titulo}','${evento.descricao}','${evento.data}','${evento.horario}','${evento.local}','${evento.valor}','${evento.ingresso}','EDITAR')">Alterar</button>
                    <button onclick="selecionarCliente('${evento.titulo}','${evento.descricao}','${evento.data}','${evento.horario}','${evento.local}','${evento.valor}','${evento.ingresso}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML="";
        espacoTabela.appendChild(tabela);
    }
    else{
        exibirMensagem('Nenhum evento encontrado.');
    }
}