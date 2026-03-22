import { forwardRef, useState } from "react";
import {
  CheckIcon,
  PencilSimpleLineIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import styles from "./Task.module.scss";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Task as TaskType } from "../../hooks/useTasks";

type TaskProps = {
  taskContent: TaskType;
  isEditing: boolean;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
  onSetEditing: (id: string | null) => void;
  onMarkTask: (id: string) => void;
} & Partial<DraggableProvided["draggableProps"]> &
  Partial<DraggableProvided["dragHandleProps"]>; // Partial torna as props de dragHandle e draggable opcionais

export const Task = forwardRef<HTMLLIElement, TaskProps>(
  (
    {
      taskContent,
      onDeleteTask,
      onEditTask,
      onMarkTask,
      isEditing,
      onSetEditing,
      ...props
    },
    ref,
  ) => {
    const { id, content, done } = taskContent;
    const [editTask, setEditTask] = useState(content);

    const handleDeleteTask = () => onDeleteTask(id);

    const handleEditTask = () => onEditTask(id, editTask);

    const handleMarkTaskAsDone = () => onMarkTask(id);

    return (
      <li ref={ref} className={styles.task} {...props}>
        <div className={styles.content}>
          <label className={styles.label}>
            <input
              type="checkbox"
              onClick={handleMarkTaskAsDone}
              disabled={isEditing}
            />
            {isEditing ? (
              <input
                type="text"
                name="editTask"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                required
              />
            ) : (
              <p className={done ? styles.done : ""}>{content}</p>
            )}
          </label>
        </div>

        <div className={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <button
                type="button"
                className={styles.editButton}
                onClick={handleEditTask}
                title="Salvar tarefa"
              >
                <CheckIcon size={16} />
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => onSetEditing(null)}
                title="Cancelar edição da tarefa"
              >
                <XIcon size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.editButton}
                onClick={() => {
                  onSetEditing(id);
                  setEditTask(content);
                }}
                title="Editar tarefa"
              >
                <PencilSimpleLineIcon size={16} />
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDeleteTask}
                title="Excluir tarefa"
              >
                <TrashIcon size={16} />
              </button>
            </>
          )}
        </div>
      </li>
    );
  },
);
