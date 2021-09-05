import React from 'react';

const shuffleAnswers = (
  game, // Jogo
  questionNumber, // Número da pergunta (game[questionNumber])
  setAnswersDispatch, // Colocar retorno no estado
  answered, // Handle click do botão
) => {
  const answers = [];
  const incorretas = game[questionNumber].incorrect_answers;
  const correta = [game[questionNumber].correct_answer];

  // Cria a estrutura das alternativas incorretas
  answers.push(...incorretas
    .map((answer, index) => (
      <button
        type="button"
        className="incorrect-answer"
        data-testid={ `wrong-answer-${index}` }
        key={ `wrong-answer-${index}` }
        onClick={ (evt) => answered(evt) }
      >
        {answer}

      </button>)));

  // Cria a estrutura da alternativa correta
  answers.push(...correta
    .map((answer) => (
      <button
        type="button"
        id="correct-answer"
        data-testid="correct-answer"
        key="correct-answer"
        onClick={ (evt) => answered(evt) }
      >
        {answer}

      </button>)));

  // Randomizar o array das alternativas
  const randomAnswers = answers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // Salvar array randomizado no estado global
  setAnswersDispatch(randomAnswers);
};

export default shuffleAnswers;
