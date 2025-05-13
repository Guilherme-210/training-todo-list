import { useState } from "react"
import styles from "../App.module.css"

export default function QuizForm({ onAddTask }) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!question.trim() || !answer.trim()) {
      setError("Preencha a pergunta e a resposta.")
      setTimeout(() => setError(""), 2000)
      return
    }
    onAddTask({ question, answer })
    setQuestion("")
    setAnswer("")
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.quizForm}>
      <h3>Adicionar Pergunta ao Quiz</h3>
      <div>
        <label htmlFor="quiz-question">Pergunta:</label>
        <input
          id="quiz-question"
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className={styles.input}
          placeholder="Digite a pergunta"
        />
      </div>
      <div>
        <label htmlFor="quiz-answer">Resposta:</label>
        <input
          id="quiz-answer"
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          className={styles.input}
          placeholder="Digite a resposta"
        />
      </div>
      {error && <div className={styles.noTasks}>{error}</div>}
      <button type="submit" className={styles.submitButton}>Adicionar ao Quiz</button>
    </form>
  )
}