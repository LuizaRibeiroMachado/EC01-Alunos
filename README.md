# EC01 - Estudo de Caso Alunos

Estudo de caso: **Gerenciamento de Alunos em uma Escola de Programação**.

A escola "DevTech Academy" precisa de um sistema simples para **cadastrar, listar, editar e excluir** alunos e gerar **relatórios** com base nos dados cadastrados. O sistema foi feito em HTML e JavaScript puro (sem CSS e sem bibliotecas), com os dados armazenados em memória.

## Estrutura do projeto

```
EC01-Alunos/
├── index.html            Página inicial com o link de cada exercício
├── exercicio1/           CRUD com formulário, tabela e array de objetos
│   ├── index.html
│   └── script.js
├── exercicio2/           Refatoração para a classe Aluno
│   ├── index.html
│   ├── aluno.js
│   └── script.js
├── exercicio3/           addEventListener, funções anônimas e arrow functions
│   ├── index.html
│   ├── aluno.js
│   └── script.js
├── exercicio4/           Relatórios com filter, map, reduce, sort (sistema completo)
│   ├── index.html
│   ├── aluno.js
│   └── script.js
├── Dockerfile
└── docker-compose.yml
```

Cada pasta é uma evolução da anterior. A pasta `exercicio4` contém o sistema completo.

## Como executar com Docker

Pré-requisito: Docker instalado.

```bash
docker compose up --build
```

Depois, abrir no navegador: <http://localhost:8080>

Durante o desenvolvimento, as pastas do projeto ficam montadas como volume no container. Basta salvar o arquivo e atualizar a página.

Para parar o container:

```bash
docker compose down
```

## Exercícios

### Exercício 1 - Cadastro de Alunos com Formulário e Tabela (CRUD)

- Formulário HTML sem CSS com os campos Nome (`text`), Idade (`number`), Curso (`select` com JavaScript, Python e Java) e Nota Final (`number`).
- O botão "Cadastrar" adiciona o aluno em um array de objetos em memória.
- Os registros aparecem em uma tabela, e cada linha tem os botões "Editar" e "Excluir".
- Eventos ligados com `onclick`.

### Exercício 2 - Uso de Classe com Atributos, Construtor e Métodos

- Classe `Aluno` (arquivo `aluno.js`) com os atributos `nome`, `idade`, `curso` e `notaFinal`.
- Construtor para inicializar os dados.
- Método `isAprovado()`: retorna `true` se `notaFinal >= 7`. É usado na coluna "Situação" da tabela.
- Método `toString()`: retorna os dados do aluno formatados. É exibido no console ao salvar.

### Exercício 3 - Eventos, Funções Anônimas e Arrow Functions

- Os botões do formulário e da tabela usam `addEventListener`.
- Os eventos de clique usam funções anônimas (`function () { ... }`).
- As operações de manipulação dos dados (`adicionarAluno`, `atualizarAluno`, `removerAluno`) são arrow functions.
- Mensagens com `alert()` e `console.log()` ao salvar, editar e excluir um aluno.

### Exercício 4 - Relatórios com filter, map, reduce, sort

Seção "Relatórios" com um botão para cada relatório:

| Relatório | Método usado |
| --- | --- |
| Alunos aprovados (notaFinal >= 7) | `filter` |
| Média das notas finais | `reduce` |
| Média das idades | `reduce` |
| Nomes em ordem alfabética | `map` + `sort` |
| Quantidade de alunos por curso | `reduce` |

As listas são montadas na página com `forEach`. O relatório aberto é atualizado automaticamente quando um aluno é cadastrado, editado ou excluído.

## Tecnologias

- HTML5
- JavaScript
- Docker (nginx)
- Git e GitHub
