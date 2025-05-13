import styles from "../App.module.css"

export default function QuizList({ quizzes, onRemove, onEdit }) {
  if (quizzes.length === 0) {
    return (
      <div className={styles.TitleNoTasksContainer}>
        <h2 className={styles.title}>Quiz</h2>
        <hr />
        <p className={styles.noTasks}>Nenhuma pergunta cadastrada.</p>
      </div>
    )
  }

  return (
    <div className={styles.tasksFoundContainer}>
      <div className={styles.titleTasksFoundContainer}>
        <h2 className={styles.title}>Quiz</h2>
        <p className={styles.tasksFound}>
          {quizzes.length === 1
            ? "1 pergunta cadastrada."
            : `${quizzes.length} perguntas cadastradas.`}
        </p>
      </div>
      <hr />
      <ul className={styles.ulList}>
        {quizzes.map((quiz, idx) => (
          <li key={idx} className={styles.liList}>
            <div className={styles.taskContainer}>
              <strong>Pergunta:</strong> {quiz.question}
            </div>
            <div className={styles.descriptionContainer}>
              <strong>Resposta:</strong> {quiz.answer}
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.buttonEdit}
                onClick={() => onEdit(idx)}
                title="Editar"
              >
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
              <button
                className={styles.buttonRemove}
                onClick={() => onRemove(idx)}
                title="Apagar"
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
