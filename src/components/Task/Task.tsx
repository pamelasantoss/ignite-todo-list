import { forwardRef } from "react";
import { PencilSimpleLineIcon, TrashIcon } from "@phosphor-icons/react";
import styles from "./Task.module.scss";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Task as TaskType } from "../../hooks/useTasks";

type TaskProps = {
  taskContent: TaskType;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onMarkTask: (id: string) => void;
} & Partial<DraggableProvided["draggableProps"]> &
  Partial<DraggableProvided["dragHandleProps"]>; // Partial torna as props de dragHandle e draggable opcionais

export const Task = forwardRef<HTMLLIElement, TaskProps>(
  ({ taskContent, onDeleteTask, onEditTask, onMarkTask, ...props }, ref) => {
    const { id, content, done } = taskContent;

    const handleDeleteTask = () => onDeleteTask(id);

    const handleEditTask = () => onEditTask(id);

    const handleMarkTaskAsDone = () => onMarkTask(id);

    return (
      <li ref={ref} className={styles.task} {...props}>
        <div className={styles.content}>
          <label className={styles.label}>
            <input type="checkbox" onClick={handleMarkTaskAsDone} />
            <p className={done ? styles.done : ""}>{content}</p>
          </label>
        </div>

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className={styles.editButton}
            onClick={handleEditTask}
          >
            <PencilSimpleLineIcon size={16} />
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDeleteTask}
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </li>
    );
  },
);
