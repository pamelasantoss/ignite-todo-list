import { useState } from 'react';
import { Trash } from '@phosphor-icons/react'
import styles from './Task.module.scss'

type TaskProps = {
  content: string;
  onDeleteTask: (content: string) => void;
  onMarkTask: (content: string) => void;
}

export function Task({ content, onDeleteTask, onMarkTask }: TaskProps) {
  const [taskDone, setTaskDone] = useState(false)

  const handleDeleteTask = () => onDeleteTask(content)

  const handleMarkTaskAsDone = () => {
    onMarkTask(content)
    setTaskDone(!taskDone)
  }

  return (
    <div className={styles.task}>
      <div className={styles.content}>
        <label className={styles.label}>
          <input type="checkbox" onClick={handleMarkTaskAsDone} />
          <p className={taskDone ? styles.done : ""}>{content}</p>
        </label>        
      </div>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDeleteTask}
      >
        <Trash size={16} />
      </button>
    </div>
  )
}