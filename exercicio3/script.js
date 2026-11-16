// =====================================================================
// Exercício 3 - Eventos, Funções Anônimas e Arrow Functions
// - Eventos ligados com addEventListener (formulário e tabela)
// - Funções anônimas nos eventos de clique
// - Arrow functions nas operações de manipulação dos dados
// - Mensagens (alert e console.log) ao salvar, editar e excluir
// =====================================================================

// Array que guarda as instâncias de Aluno cadastradas
let alunos = [];

// Guarda a posição do aluno que está sendo editado (null = nenhum)
let indiceEdicao = null;

// Elementos da página usados pelo script
const formAluno = document.getElementById("formAluno");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCurso = document.getElementById("curso");
const campoNotaFinal = document.getElementById("notaFinal");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const corpoTabela = document.getElementById("tabelaAlunos");

// ---------------------------------------------------------------------
// Operações de manipulação dos dados (arrow functions)
// ---------------------------------------------------------------------

// CREATE - adiciona um aluno na lista
const adicionarAluno = (aluno) => {
    alunos.push(aluno);
};

// UPDATE - troca o aluno de uma posição pelos novos dados
const atualizarAluno = (indice, alunoAtualizado) => {
    alunos = alunos.map((aluno, i) => (i === indice ? alunoAtualizado : aluno));
};

// DELETE - remove o aluno de uma posição
const removerAluno = (indice) => {
    alunos = alunos.filter((aluno, i) => i !== indice);
};

// ---------------------------------------------------------------------
// Funções do formulário
// ---------------------------------------------------------------------

// Lê os campos do formulário, valida e devolve uma instância de Aluno.
// Se algum campo estiver inválido, avisa o usuário e devolve null.
const lerFormulario = () => {
    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);
    const curso = campoCurso.value;
    const notaFinal = Number(campoNotaFinal.value);

    if (nome === "") {
        alert("Informe o nome do aluno.");
        return null;
    }
    if (!Number.isInteger(idade) || idade <= 0) {
        alert("Informe uma idade válida.");
        return null;
    }
    if (campoNotaFinal.value === "" || isNaN(notaFinal) || notaFinal < 0 || notaFinal > 10) {
        alert("Informe uma nota final entre 0 e 10.");
        return null;
    }

    return new Aluno(nome, idade, curso, notaFinal);
};

// Limpa os campos e volta o formulário para o modo de cadastro
const limparFormulario = () => {
    formAluno.reset();
    btnCadastrar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
    indiceEdicao = null;
};

// Leva os dados do aluno escolhido para o formulário (modo de edição)
const preencherFormulario = (indice) => {
    const aluno = alunos[indice];

    campoNome.value = aluno.nome;
    campoIdade.value = aluno.idade;
    campoCurso.value = aluno.curso;
    campoNotaFinal.value = aluno.notaFinal;

    indiceEdicao = indice;
    btnCadastrar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;
    campoNome.focus();
};

// Mostra a mensagem na tela (alert) e também no console
const exibirMensagem = (mensagem) => {
    console.log(mensagem);
    alert(mensagem);
};

// ---------------------------------------------------------------------
// Tabela
// ---------------------------------------------------------------------

// Cria uma célula (<td>) com um texto
const criarCelula = (texto) => {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
};

// Cria uma linha (<tr>) da tabela com os dados e os botões do aluno
const criarLinha = (aluno, indice) => {
    const linha = document.createElement("tr");

    linha.appendChild(criarCelula(aluno.nome));
    linha.appendChild(criarCelula(aluno.idade));
    linha.appendChild(criarCelula(aluno.curso));
    linha.appendChild(criarCelula(aluno.notaFinal));
    linha.appendChild(criarCelula(aluno.isAprovado() ? "Aprovado" : "Reprovado"));

    const celulaAcoes = document.createElement("td");

    // Botão Editar: evento de clique com função anônima
    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", function () {
        preencherFormulario(indice);
        console.log("Editando o aluno: " + aluno.toString());
    });

    // Botão Excluir: evento de clique com função anônima
    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
        removerAluno(indice);

        // Se havia uma edição em andamento, ela é cancelada,
        // porque as posições do array mudaram
        limparFormulario();
        renderizarTabela();
        exibirMensagem("Aluno excluído com sucesso!\n" + aluno.toString());
    });

    celulaAcoes.appendChild(botaoEditar);
    celulaAcoes.appendChild(document.createTextNode(" "));
    celulaAcoes.appendChild(botaoExcluir);
    linha.appendChild(celulaAcoes);

    return linha;
};

// READ - monta as linhas da tabela a partir do array de alunos
const renderizarTabela = () => {
    corpoTabela.innerHTML = "";

    if (alunos.length === 0) {
        const linhaVazia = document.createElement("tr");
        const celulaVazia = criarCelula("Nenhum aluno cadastrado.");
        celulaVazia.colSpan = 6;
        linhaVazia.appendChild(celulaVazia);
        corpoTabela.appendChild(linhaVazia);
        return;
    }

    alunos.forEach((aluno, indice) => {
        corpoTabela.appendChild(criarLinha(aluno, indice));
    });
};

// ---------------------------------------------------------------------
// Eventos dos botões do formulário (addEventListener + função anônima)
// ---------------------------------------------------------------------

// Botão Cadastrar / Salvar alterações
btnCadastrar.addEventListener("click", function () {
    const aluno = lerFormulario();
    if (aluno === null) {
        return;
    }

    // Guarda se era edição antes de limpar o formulário
    const estavaEditando = indiceEdicao !== null;

    if (estavaEditando) {
        atualizarAluno(indiceEdicao, aluno);
    } else {
        adicionarAluno(aluno);
    }

    limparFormulario();
    renderizarTabela();

    if (estavaEditando) {
        exibirMensagem("Aluno editado com sucesso!\n" + aluno.toString());
    } else {
        exibirMensagem("Aluno salvo com sucesso!\n" + aluno.toString());
    }
});

// Botão Cancelar (aparece somente durante a edição)
btnCancelar.addEventListener("click", function () {
    limparFormulario();
    console.log("Edição cancelada.");
});

// Mostra a tabela (vazia) assim que a página carrega
renderizarTabela();
