import { useState } from "react";
import "./App.css";

export default function App() {
  // -------------------------
  // 1. Kalkulaator
  // -------------------------
  const [num1, setNum1] = useState<number | "">("");
  const [num2, setNum2] = useState<number | "">("");
  const [operation, setOperation] = useState("add");
  const [calcResult, setCalcResult] = useState<string>("");

  const calculate = () => {
    if (num1 === "" || num2 === "") {
      setCalcResult("Palun sisesta mõlemad arvud.");
      return;
    }

    let result: number;

    switch (operation) {
      case "add":
        result = Number(num1) + Number(num2);
        break;
      case "sub":
        result = Number(num1) - Number(num2);
        break;
      case "mul":
        result = Number(num1) * Number(num2);
        break;
      case "div":
        if (Number(num2) === 0) {
          setCalcResult("Nulliga jagamine pole lubatud.");
          return;
        }
        result = Number(num1) / Number(num2);
        break;
      default:
        result = 0;
    }

    setCalcResult("Tulemus: " + result);
  };

  // -------------------------
  // 2. Mini-viktoriin
  // -------------------------
  const quizQuestions = [
    {
      question: "Mis keeles on see leht kirjutatud?",
      correct: "HTML, CSS ja JavaScript",
      options: ["C++", "HTML, CSS ja JavaScript", "Python"],
    },
    {
      question: "Milline sündmus käivitub nupule vajutamisel?",
      correct: "onclick",
      options: ["oninput", "onclick", "onsubmit"],
    },
    {
      question: "Mida teeb CSS?",
      correct: "Määrab kujunduse ja stiili",
      options: ["Määrab kujunduse ja stiili", "Käivitab serveri", "Salvestab andmebaasi"],
    },
  ];

  const [quizAnswers, setQuizAnswers] = useState<(string | "")[]>(
    Array(quizQuestions.length).fill("")
  );
  const [score, setScore] = useState("");

  const checkQuiz = () => {
    let correctCount = 0;
    quizAnswers.forEach((ans, i) => {
      if (ans === quizQuestions[i].correct) correctCount++;
    });
    setScore(`Sinu skoor: ${correctCount} / ${quizQuestions.length}`);
  };

  // -------------------------
  // 3. To-do list
  // -------------------------
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (!todoInput.trim()) return;
    setTodos([...todos, todoInput]);
    setTodoInput("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // -------------------------
  // JSX
  // -------------------------
  return (
    <div>
      <h1>Interaktiivne veebileht</h1>

      {/* Kalkulaator */}
      <section>
        <h2>Kalkulaator</h2>

        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Esimene arv"
        />

        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Teine arv"
        />

        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Liitmine (+)</option>
          <option value="sub">Lahutamine (-)</option>
          <option value="mul">Korrutamine (*)</option>
          <option value="div">Jagamine (/)</option>
        </select>

        <button onClick={calculate}>Arvuta</button>

        <p><strong>{calcResult}</strong></p>
      </section>

      {/* Viktoriin */}
      <section>
        <h2>Mini-viktoriin</h2>

        {quizQuestions.map((q, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <p>{i + 1}. {q.question}</p>

            <select
              value={quizAnswers[i]}
              onChange={(e) => {
                const newAnswers = [...quizAnswers];
                newAnswers[i] = e.target.value;
                setQuizAnswers(newAnswers);
              }}
            >
              <option value="">Vali vastus...</option>
              {q.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {quizAnswers[i] && (
              <p className={quizAnswers[i] === q.correct ? "correct" : "incorrect"}>
                {quizAnswers[i] === q.correct ? "Õige!" : "Vale vastus."}
              </p>
            )}
          </div>
        ))}

        <button onClick={checkQuiz}>Kontrolli vastuseid</button>
        <p><strong>{score}</strong></p>
      </section>

      {/* To-do list */}
      <section>
        <h2>To‑do list</h2>

        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Lisa ülesanne..."
        />

        <button onClick={addTodo}>Lisa</button>

        <div style={{ marginTop: "10px" }}>
          {todos.map((task, i) => (
            <div key={i} className="todo-item">
              <span>{task}</span>
              <button onClick={() => deleteTodo(i)}>Kustuta</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
