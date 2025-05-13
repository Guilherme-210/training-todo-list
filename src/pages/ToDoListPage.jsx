import { useState } from "react"
import styles from "../App.module.css"
import ToDoForm from "../components/ToDoForm.jsx"
import ToDoList from "../components/ToDoList.jsx"
import QuizForm from "../components/QuizForm.jsx"
import QuizList from "../components/QuizList.jsx"
import Modal from "../components/Modal.jsx"

export default function ToDoListPage() {
  const [quizzes, setQuizzes] = useState(() => {
    const storageQuizzes = localStorage.getItem("obc-quizzes")
    if (!storageQuizzes) return []
    return JSON.parse(storageQuizzes)
  })
  const [tasks, setTasks] = useState(() => {
    const storageTasks = localStorage.getItem("obc-tasks")
    if (!storageTasks) return []
    return JSON.parse(storageTasks)
  })
  const [editTaskModal, setEditTaskModal] = useState({
    open: false,
    id: null,
    title: "",
    description: "",
  })
  const [editQuizModal, setEditQuizModal] = useState({
    open: false,
    idx: null,
    question: "",
    answer: "",
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

  function handleEditTask(id) {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    setEditTaskModal({
      open: true,
      id,
      title: task.title,
      description: task.description || "",
    })
  }

  function handleEditTaskSave() {
    setTasks((state) => {
      const newState = state.map((t) =>
        t.id === editTaskModal.id
          ? {
              ...t,
              title: editTaskModal.title,
              description: editTaskModal.description,
            }
          : t
      )
      localStorage.setItem("obc-tasks", JSON.stringify(newState))
      return newState
    })
    setEditTaskModal({ open: false, id: null, title: "", description: "" })
  }

  function handleAddQuizzes(quizz) {
    setQuizzes((state) => {
      const newState = [{ ...quizz, checked: false }, ...state]
      localStorage.setItem("obc-quizzes", JSON.stringify(newState))
      return newState
    })
  }

  function handleRemoveQuiz(idx) {
    setQuizzes((state) => {
      const newState = state.filter((_, i) => i !== idx)
      localStorage.setItem("obc-quizzes", JSON.stringify(newState))
      return newState
    })
  }

  function handleEditQuiz(idx) {
    const quiz = quizzes[idx]
    if (!quiz) return
    setEditQuizModal({
      open: true,
      idx,
      question: quiz.question,
      answer: quiz.answer,
    })
  }

  function handleEditQuizSave() {
    setQuizzes((state) => {
      const newState = state.map((q, i) =>
        i === editQuizModal.idx
          ? {
              ...q,
              question: editQuizModal.question,
              answer: editQuizModal.answer,
            }
          : q
      )
      localStorage.setItem("obc-quizzes", JSON.stringify(newState))
      return newState
    })
    setEditQuizModal({ open: false, idx: null, question: "", answer: "" })
  }

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <ToDoForm onAddTask={handleAddTask} />
      </section>
      <section className={styles.contentTasks}>
        <ToDoList
          tasks={tasks}
          onRemove={handleRemoveTask}
          onToggleCheck={handleToggleCheck}
          onEdit={handleEditTask}
        />
      </section>
      <section className={styles.content}>
        <QuizForm onAddTask={handleAddQuizzes} />
      </section>
      <section className={styles.contentTasks}>
        <QuizList
          quizzes={quizzes}
          onRemove={handleRemoveQuiz}
          onEdit={handleEditQuiz}
        />
      </section>
      <Modal
        open={editTaskModal.open}
        title="Editar Tarefa"
        onClose={() =>
          setEditTaskModal({
            open: false,
            id: null,
            title: "",
            description: "",
          })
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEditTaskSave()
          }}
          className={styles.modalForm}
        >
          <label>
            Título:
            <input
              className={styles.input}
              value={editTaskModal.title}
              onChange={(e) =>
                setEditTaskModal((modal) => ({
                  ...modal,
                  title: e.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Descrição:
            <input
              className={styles.input}
              value={editTaskModal.description}
              onChange={(e) =>
                setEditTaskModal((modal) => ({
                  ...modal,
                  description: e.target.value,
                }))
              }
            />
          </label>
          <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <div className={styles.buttonContainerModal}>
              <button
                type="button"
                className={styles.buttonRemove}
                onClick={() =>
                  setEditTaskModal({
                    open: false,
                    id: null,
                    title: "",
                    description: "",
                  })
                }
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                style={{ marginLeft: 8 }}
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        open={editQuizModal.open}
        title="Editar Quiz"
        onClose={() =>
          setEditQuizModal({ open: false, idx: null, question: "", answer: "" })
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEditQuizSave()
          }}
          className={styles.modalForm}
        >
          <label>
            Pergunta:
            <input
              className={styles.input}
              value={editQuizModal.question}
              onChange={(e) =>
                setEditQuizModal((modal) => ({
                  ...modal,
                  question: e.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Resposta:
            <input
              className={styles.input}
              value={editQuizModal.answer}
              onChange={(e) =>
                setEditQuizModal((modal) => ({
                  ...modal,
                  answer: e.target.value,
                }))
              }
              required
            />
          </label>
          <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <div className={styles.buttonContainerModal}>
              <button
                type="button"
                className={styles.buttonRemove}
                onClick={() =>
                  setEditQuizModal({
                    open: false,
                    idx: null,
                    question: "",
                    answer: "",
                  })
                }
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                style={{ marginLeft: 8 }}
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </main>
  )
}
