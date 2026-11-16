// =====================================================================
// Exercício 4 - Relatórios com filter, map, reduce, sort
// Sistema completo: CRUD (Ex. 1) + classe Aluno (Ex. 2) +
// eventos e arrow functions (Ex. 3) + relatórios (Ex. 4).
// =====================================================================

// Array que guarda as instâncias de Aluno cadastradas
let alunos = [];

// Guarda a posição do aluno que está sendo editado (null = nenhum)
let indiceEdicao = null;

// Guarda qual relatório está aberto, para ele ser refeito
// automaticamente sempre que os dados mudarem (null = nenhum)
let relatorioAtual = null;

// Elementos da página usados pelo script
const formAluno = document.getElementById("formAluno");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCurso = document.getElementById("curso");
const campoNotaFinal = document.getElementById("notaFinal");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const corpoTabela = document.getElementById("tabelaAlunos");
const areaRelatorio = document.getElementById("relatorio");

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
// Cálculos dos relatórios (filter, map, reduce, sort)
// ---------------------------------------------------------------------

// filter: somente os alunos aprovados (notaFinal >= 7)
const listarAprovados = () => alunos.filter((aluno) => aluno.isAprovado());

// reduce: soma as notas finais e divide pela quantidade de alunos
const calcularMediaNotas = () => {
    if (alunos.length === 0) {
        return 0;
    }
    const somaNotas = alunos.reduce((soma, aluno) => soma + aluno.notaFinal, 0);
    return somaNotas / alunos.length;
};

// reduce: soma as idades e divide pela quantidade de alunos
const calcularMediaIdades = () => {
    if (alunos.length === 0) {
        return 0;
    }
    const somaIdades = alunos.reduce((soma, aluno) => soma + aluno.idade, 0);
    return somaIdades / alunos.length;
};

// map + sort: pega só os nomes e coloca em ordem alfabética
const listarNomesOrdenados = () =>
    alunos
        .map((aluno) => aluno.nome)
        .sort((nomeA, nomeB) => nomeA.localeCompare(nomeB, "pt-BR"));

// reduce: conta quantos alunos existem em cada curso
const contarAlunosPorCurso = () =>
    alunos.reduce(
        (contagem, aluno) => {
            contagem[aluno.curso] = contagem[aluno.curso] + 1;
            return contagem;
        },
        { JavaScript: 0, Python: 0, Java: 0 }
    );

// ---------------------------------------------------------------------
// Exibição dos relatórios na página
// ---------------------------------------------------------------------

// Limpa a área de relatório e coloca o título do relatório
const iniciarRelatorio = (titulo) => {
    areaRelatorio.innerHTML = "";
    const elementoTitulo = document.createElement("h3");
    elementoTitulo.textContent = titulo;
    areaRelatorio.appendChild(elementoTitulo);
};

// Acrescenta um parágrafo na área de relatório
const adicionarParagrafo = (texto) => {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;
    areaRelatorio.appendChild(paragrafo);
};

// Acrescenta uma lista (<ul>) na área de relatório, usando forEach
const adicionarLista = (itens) => {
    const lista = document.createElement("ul");
    itens.forEach((item) => {
        const itemLista = document.createElement("li");
        itemLista.textContent = item;
        lista.appendChild(itemLista);
    });
    areaRelatorio.appendChild(lista);
};

// Relatório 1: alunos aprovados
const exibirAprovados = () => {
    iniciarRelatorio("Alunos aprovados (nota final >= 7)");
    const aprovados = listarAprovados();

    if (aprovados.length === 0) {
        adicionarParagrafo("Nenhum aluno aprovado.");
        return;
    }
    adicionarLista(aprovados.map((aluno) => aluno.toString()));
    adicionarParagrafo("Total de aprovados: " + aprovados.length);
};

// Relatório 2: média das notas finais
const exibirMediaNotas = () => {
    iniciarRelatorio("Média das notas finais");

    if (alunos.length === 0) {
        adicionarParagrafo("Nenhum aluno cadastrado.");
        return;
    }
    adicionarParagrafo("Média das notas finais: " + calcularMediaNotas().toFixed(2));
};

// Relatório 3: média das idades
const exibirMediaIdades = () => {
    iniciarRelatorio("Média das idades");

    if (alunos.length === 0) {
        adicionarParagrafo("Nenhum aluno cadastrado.");
        return;
    }
    adicionarParagrafo("Média das idades: " + calcularMediaIdades().toFixed(2) + " anos");
};

// Relatório 4: nomes em ordem alfabética
const exibirNomesOrdenados = () => {
    iniciarRelatorio("Nomes dos alunos em ordem alfabética");

    if (alunos.length === 0) {
        adicionarParagrafo("Nenhum aluno cadastrado.");
        return;
    }
    adicionarLista(listarNomesOrdenados());
};

// Relatório 5: quantidade de alunos por curso
const exibirAlunosPorCurso = () => {
    iniciarRelatorio("Quantidade de alunos por curso");
    const contagem = contarAlunosPorCurso();

    adicionarLista(
        Object.keys(contagem).map((curso) => curso + ": " + contagem[curso] + " aluno(s)")
    );
};

// Abre um relatório e guarda qual foi, para atualizar depois
const abrirRelatorio = (exibirRelatorio) => {
    relatorioAtual = exibirRelatorio;
    exibirRelatorio();
};

// Refaz o relatório aberto (chamado sempre que os dados mudam)
const atualizarRelatorio = () => {
    if (relatorioAtual !== null) {
        relatorioAtual();
    }
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
        atualizarTela();
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

// Atualiza a tabela e o relatório aberto depois de qualquer mudança
const atualizarTela = () => {
    renderizarTabela();
    atualizarRelatorio();
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
    atualizarTela();

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

// ---------------------------------------------------------------------
// Eventos dos botões de relatório (addEventListener + função anônima)
// ---------------------------------------------------------------------

document.getElementById("btnAprovados").addEventListener("click", function () {
    abrirRelatorio(exibirAprovados);
});

document.getElementById("btnMediaNotas").addEventListener("click", function () {
    abrirRelatorio(exibirMediaNotas);
});

document.getElementById("btnMediaIdades").addEventListener("click", function () {
    abrirRelatorio(exibirMediaIdades);
});

document.getElementById("btnOrdemAlfabetica").addEventListener("click", function () {
    abrirRelatorio(exibirNomesOrdenados);
});

document.getElementById("btnPorCurso").addEventListener("click", function () {
    abrirRelatorio(exibirAlunosPorCurso);
});

// Mostra a tabela (vazia) assim que a página carrega
renderizarTabela();
