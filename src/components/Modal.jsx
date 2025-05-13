import styles from "../App.module.css"

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}