import styles from "../App.module.css"
import ToDoItem from "./ToDoItem.jsx"

export default function ToDoList({ tasks, onRemove, onToggleCheck, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div>
        <div className={styles.TitleNoTasksContainer}>
          <h2 className={styles.title}>Lista de Tarefas</h2>
          <hr />
          <p className={styles.noTasks}>Nenhuma tarefa encontrada.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.tasksFoundContainer}>
      <div>
        <div className={styles.titleTasksFoundContainer}>
          <h2 className={styles.title}>Lista de Tarefas</h2>
          <p className={styles.tasksFound}>
            {tasks.length === 1
              ? "1 tarefa encontrada."
              : `${tasks.length} tarefas encontradas.`}
          </p>
        </div>
      </div>
      <hr />
      <div className={styles.tasksContainer}>
        <ul className={styles.ulList}>
          {tasks.map((task) => (
            <ToDoItem
              key={task.id}
              task={task}
              onRemove={onRemove}
              onToggleCheck={onToggleCheck}
              onEdit={onEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
