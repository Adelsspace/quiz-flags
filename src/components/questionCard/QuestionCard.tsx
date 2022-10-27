import React from "react";
import { AnswerObjectOptions } from "../../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type QuestionCardOptions = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObjectOptions | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<QuestionCardOptions> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <Wrapper>
    <h3>Флаг какой страны изображён?</h3>
    <p className="number">
      Вопрос: {questionNumber} / {totalQuestions}
    </p>
    <img src={question}></img>
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
