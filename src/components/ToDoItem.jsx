import styles from "../App.module.css"

export default function ToDoItem({ task, onRemove, onToggleCheck, onEdit }) {
  return (
    <li className={styles.liList}>
      <div className={styles.taskContainer}>
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => onToggleCheck(task.id)}
          className={styles.checkboxTask}
        />
        <span className={task.checked ? styles.taskChecked : ""}>
          {task.title}
        </span>
      </div>
      {task.description && (
        <div className={styles.descriptionOnHover}>
          <span>
            <p className={styles.description}>{task.description}</p>
          </span>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button
          className={styles.buttonEdit}
          onClick={() => onEdit(task.id)}
          title="Editar"
        >
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
        <button
          className={styles.buttonRemove}
          onClick={() => onRemove(task.id)}
          title="Apagar"
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </li>
  )
}