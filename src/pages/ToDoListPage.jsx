import { useState } from "react"
import styles from "../App.module.css"
import ToDoForm from "../components/ToDoForm.jsx"
import ToDoList from "../components/ToDoList.jsx"

export default function ToDoListPage() {
  const [tasks, setTasks] = useState(() => {
    const storageTasks = localStorage.getItem("obc-tasks")
    if (!storageTasks) return []
    return JSON.parse(storageTasks)
  })

  function handleAddTask(task) {
    setTasks((state) => {
      const newState = [{ ...task, checked: false }, ...state]
      localStorage.setItem("obc-tasks", JSON.stringify(newState))
      return newState
    })
  }

  function handleRemoveTask(id) {
    setTasks((state) => {
      const newState = state.filter((t) => t.id !== id)
      localStorage.setItem("obc-tasks", JSON.stringify(newState))
      return newState
    })
  }

  function handleToggleCheck(id) {
    setTasks((state) => {
      const newState = state.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
      localStorage.setItem("obc-tasks", JSON.stringify(newState))
      return newState
    })
  }

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <ToDoForm onAddTask={handleAddTask} />
      </section>
      <section className={styles.contentTasks}>
        <ToDoList tasks={tasks} onRemove={handleRemoveTask} onToggleCheck={handleToggleCheck} />
      </section>
    </main>
  )
}