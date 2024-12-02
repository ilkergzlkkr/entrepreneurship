import { useEffect, useState } from "react";
import "./App.css";
import { type Question, questions } from "./questions";

function App() {
  const [i, setI] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const question = (questions[i] as Question | undefined) || null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question) {
      alert("Quiz completed!");
      return;
    }

    const form = event.target as HTMLFormElement;
    const answer = (form.elements.namedItem(question.question) as RadioNodeList)
      .value;

    if (answer.startsWith(question.answer)) {
      alert("Correct!");
    } else {
      setIncorrect((i) => i + 1);
      alert("Incorrect!, The correct answer is " + question.answer);
    }
    setI((i) => i + 1);
  }

  // listen key press events on A, B, C, D
  // if key press event is detected, submit the form

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!question) {
        return;
      }

      const form = document.getElementsByTagName("form")[0];
      const key = event.key.toUpperCase();
      if (key === "A" || key === "B" || key === "C" || key === "D") {
        if (form) {
          const answer = form.elements.namedItem(
            question.question
          ) as RadioNodeList;

          if (answer) {
            (answer[parseInt(key, 36) - 10] as HTMLElement).click();
          }
        }
      }

      if (key === "ENTER" && form) {
        const button = form.getElementsByTagName("button")[0];
        if (button) {
          button.click();
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [question]);

  if (!question) {
    return (
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h3>Entrepreneurship Quiz</h3>
        <p>Quiz completed!</p>
        <p>Incorrect answers: {incorrect}</p>
        <p>Total questions: {questions.length}</p>
        <button
          onClick={() => {
            setI(0);
            setIncorrect(0);
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ paddingBottom: "4px" }}>
        <h3>Entrepreneurship Quiz</h3>
        Question {i + 1}/{questions.length}
      </div>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <p></p>
        <form key={i} onSubmit={handleSubmit}>
          <div>
            <h2>{question.question}</h2>
            <div style={{ textAlign: "left" }}>
              {question.choices.map((choice, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "1.5em",
                    padding: "2px",
                  }}
                >
                  <input
                    type="radio"
                    id={choice}
                    name={question.question}
                    value={choice}
                  />
                  <label htmlFor={choice}>{choice}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
