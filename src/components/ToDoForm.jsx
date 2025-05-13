import { useState } from "react"
import styles from "../App.module.css"

export default function ToDoForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState("")
  const [descriptionValue, setDescriptionValue] = useState("")
  const [inputStyle, setInputStyle] = useState(styles.input)
  const [descriptionStyle, setDescriptionStyle] = useState(styles.input)
  const [showDescription, setShowDescription] = useState(false)

  function handleSubmit(ev) {
    ev.preventDefault()
    if (inputValue.trim() === "") {
      setInputStyle(styles.inputError)
      setTimeout(() => setInputStyle(styles.input), 3000)
      return
    }
    setInputStyle(styles.inputCheckd)
    setTimeout(() => setInputStyle(styles.input), 3000)

    if (showDescription && descriptionValue.trim() === "") {
      setDescriptionStyle(styles.inputError)
      setTimeout(() => setDescriptionStyle(styles.input), 3000)
      return
    }
    setDescriptionStyle(styles.inputCheckd)
    setTimeout(() => setDescriptionStyle(styles.input), 3000)

    onAddTask({
      id: Date.now(),
      title: inputValue,
      description: showDescription ? descriptionValue : "",
    })
    setInputValue("")
    setDescriptionValue("")
    setShowDescription(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <h3>Adicionar tarefa</h3>
        <label htmlFor="input">Digite uma tarefa: </label>
        <input
          type="text"
          id="input"
          name="input"
          className={inputStyle}
          placeholder="Digite uma tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <div className={styles.checkboxDescriptionContainer}>
          <label htmlFor="checkboxDescription">
            Gostaria de adicionar uma descrição?{" "}
            <input
              type="checkbox"
              id="checkboxDescription"
              name="checkboxDescription"
              className={styles.checkboxDescription}
              checked={showDescription}
              onChange={(e) => setShowDescription(e.target.checked)}
            />
          </label>
        </div>
        {showDescription && (
          <div className={styles.textDescriptionContainer}>
            <label htmlFor="description">Descrição: </label>
            <input
              type="text"
              id="description"
              name="description"
              className={descriptionStyle}
              placeholder="Digite uma descrição..."
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </div>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Adicionar
      </button>
    </form>
  )
}