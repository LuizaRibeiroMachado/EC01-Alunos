// =====================================================================
// Classe Aluno - cada registro do sistema é uma instância desta classe
// =====================================================================

class Aluno {
    // Construtor: inicializa os atributos do aluno
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Retorna true se o aluno foi aprovado (notaFinal >= 7)
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Retorna os dados do aluno formatados em texto
    toString() {
        var situacao = this.isAprovado() ? "Aprovado" : "Reprovado";

        return "Nome: " + this.nome +
            " | Idade: " + this.idade +
            " | Curso: " + this.curso +
            " | Nota Final: " + this.notaFinal +
            " | Situação: " + situacao;
    }
}
