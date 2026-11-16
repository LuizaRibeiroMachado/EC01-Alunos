// =====================================================================
// Exercício 1 - Cadastro de Alunos com Formulário e Tabela (CRUD)
// Os dados ficam armazenados em memória, em um array de objetos.
// =====================================================================

// Array de objetos que guarda os alunos cadastrados
var alunos = [];

// Guarda a posição do aluno que está sendo editado (null = nenhum)
var indiceEdicao = null;

// Lê os campos do formulário, valida e devolve um objeto aluno.
// Se algum campo estiver inválido, avisa o usuário e devolve null.
function lerFormulario() {
    var nome = document.getElementById("nome").value.trim();
    var idade = Number(document.getElementById("idade").value);
    var curso = document.getElementById("curso").value;
    var campoNota = document.getElementById("notaFinal").value;
    var notaFinal = Number(campoNota);

    if (nome === "") {
        alert("Informe o nome do aluno.");
        return null;
    }
    if (!Number.isInteger(idade) || idade <= 0) {
        alert("Informe uma idade válida.");
        return null;
    }
    if (campoNota === "" || isNaN(notaFinal) || notaFinal < 0 || notaFinal > 10) {
        alert("Informe uma nota final entre 0 e 10.");
        return null;
    }

    // Objeto que representa um aluno
    return {
        nome: nome,
        idade: idade,
        curso: curso,
        notaFinal: notaFinal
    };
}

// Limpa os campos e volta o formulário para o modo de cadastro
function limparFormulario() {
    document.getElementById("formAluno").reset();
    document.getElementById("btnCadastrar").textContent = "Cadastrar";
    document.getElementById("btnCancelar").hidden = true;
    indiceEdicao = null;
}

// CREATE / UPDATE - chamado pelo onclick do botão "Cadastrar"
function salvarAluno() {
    var aluno = lerFormulario();
    if (aluno === null) {
        return;
    }

    if (indiceEdicao === null) {
        // Cadastro: adiciona o novo aluno na lista
        alunos.push(aluno);
    } else {
        // Edição: substitui os dados do aluno que estava sendo editado
        alunos[indiceEdicao] = aluno;
    }

    limparFormulario();
    renderizarTabela();
}

// UPDATE - leva os dados do aluno escolhido para o formulário
function editarAluno(indice) {
    var aluno = alunos[indice];

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;

    indiceEdicao = indice;
    document.getElementById("btnCadastrar").textContent = "Salvar alterações";
    document.getElementById("btnCancelar").hidden = false;
    document.getElementById("nome").focus();
}

// Desiste da edição em andamento - chamado pelo onclick do botão "Cancelar"
function cancelarEdicao() {
    limparFormulario();
}

// DELETE - remove o aluno da lista
function excluirAluno(indice) {
    alunos.splice(indice, 1);

    // Se havia uma edição em andamento, ela é cancelada,
    // porque as posições do array mudaram
    limparFormulario();
    renderizarTabela();
}

// READ - monta as linhas da tabela a partir do array de alunos
function renderizarTabela() {
    var corpoTabela = document.getElementById("tabelaAlunos");
    corpoTabela.innerHTML = "";

    if (alunos.length === 0) {
        var linhaVazia = document.createElement("tr");
        var celulaVazia = document.createElement("td");
        celulaVazia.colSpan = 5;
        celulaVazia.textContent = "Nenhum aluno cadastrado.";
        linhaVazia.appendChild(celulaVazia);
        corpoTabela.appendChild(linhaVazia);
        return;
    }

    for (var i = 0; i < alunos.length; i++) {
        corpoTabela.appendChild(criarLinha(alunos[i], i));
    }
}

// Cria uma linha (<tr>) da tabela com os dados e os botões do aluno
function criarLinha(aluno, indice) {
    var linha = document.createElement("tr");

    var celulaNome = document.createElement("td");
    celulaNome.textContent = aluno.nome;
    linha.appendChild(celulaNome);

    var celulaIdade = document.createElement("td");
    celulaIdade.textContent = aluno.idade;
    linha.appendChild(celulaIdade);

    var celulaCurso = document.createElement("td");
    celulaCurso.textContent = aluno.curso;
    linha.appendChild(celulaCurso);

    var celulaNota = document.createElement("td");
    celulaNota.textContent = aluno.notaFinal;
    linha.appendChild(celulaNota);

    // Botões de ação da linha, ligados pelo evento onclick
    var celulaAcoes = document.createElement("td");

    var botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = function () {
        editarAluno(indice);
    };

    var botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
        excluirAluno(indice);
    };

    celulaAcoes.appendChild(botaoEditar);
    celulaAcoes.appendChild(document.createTextNode(" "));
    celulaAcoes.appendChild(botaoExcluir);
    linha.appendChild(celulaAcoes);

    return linha;
}

// Mostra a tabela (vazia) assim que a página carrega
renderizarTabela();
