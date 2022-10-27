import React, { useState } from "react";
import { fetch2 } from "./API";
import QuestionCard from "./components/questionCard/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.styles";
import { shuffleArray } from "./utils";

export type AnswerObjectOptions = {
  flag?: string;
  answer: string;
  correctAnswer: string;
  correct: boolean;
};

const TOTAL_QUESTIONS = 10;

type QuetionOptions = {
  correctAnswer: string;
  flag: string;
};
type QuetionState = QuetionOptions & { shuffledQuestions: string[] };
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuetionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObjectOptions[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    /*
    Генерация 10 случайных вопросов
    повторить 10 раз
    1. 4 случайных числа от 0 до 196
    2. добавление по этим числам стран(id) в массив
    3. берем первый вариант как правильный
    4. мешаем массив
    5.создаем объект с массивом, правильным ответом, ссылкой на флаг
    6. пушим в array вопросов
    */
    try {
      const res = await fetch2();
      if (res === "Failed to fetch") throw new Error(res);
      const answersArray = [];
      for (let i = 0; i < 10; i++) {
        const randomIdsArray: number[] = [];
        for (let i = 0; i < 4; i++) {
          let randomNumber: number = Math.floor(Math.random() * 196);
          if (!randomIdsArray.includes(randomNumber)) {
            randomIdsArray.push(randomNumber);
            i++;
          }
          i--;
        }

        const countryNames: string[] = [];
        for (let i = 0; i < randomIdsArray.length; i++) {
          countryNames.push(res[randomIdsArray[i]].name);
        }
        const correctAnswer = countryNames[0];

        const shuffledQuestions = shuffleArray(countryNames);

        const answer = {
          shuffledQuestions,
          correctAnswer,
          flag: `https://world-of-flags-backend.herokuapp.com${
            res[randomIdsArray[0]].flag
          }`,
        };
        answersArray.push(answer);
      }

      setQuestions(answersArray);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      const message: string = `Простите, ошибка получения данных с сервера (${error}). Попробуйте поздее или свяжитесь с разработчиком сайта.`;
      console.error(message);
      setLoading(false);
      setGameOver(true);
      alert(message);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correctAnswer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].shuffledQuestions,
        answer,
        correct,
        correctAnswer: questions[number].correctAnswer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Wrapper className="App">
        <h1>Викторина</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Начать сначала
          </button>
        ) : null}
        {!gameOver ? <p className="score">Очки: {score}</p> : null}
        {loading && <p>Загрузка вопросов...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].flag}
            answers={questions[number].shuffledQuestions}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Следующий вопрос
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
