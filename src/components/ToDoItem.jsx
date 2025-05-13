import styles from "../App.module.css"

export default function ToDoItem({ task, onRemove, onToggleCheck }) {
  return (
    <li className={styles.liList + " " + styles.liListHover}>
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
      <div className={styles.descriptionContainer + " " + styles.descriptionOnHover}>
        {task.description && (
          <span>
            <p className={styles.description}>{task.description}</p>
          </span>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonEdit}>
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
        <button
          className={styles.buttonRemove}
          onClick={() => onRemove(task.id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </li>
  )
}