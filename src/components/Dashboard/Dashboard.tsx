import { ChangeEvent, useEffect, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { useTask } from "../../hooks/useTasks";
import { Task } from "../Task/Task";
import emptyClipboard from "../../assets/empty-clipboard.svg";
import styles from "./Dashboard.module.scss";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Toast } from "../Toast/Toast";
import { useToast } from "../../hooks/useToast";

export function Dashboard() {
  const [newTask, setNewTask] = useState("");
  const {
    tasks,
    clearField,
    taskStatus,
    onCreateNewTask,
    onDeleteTask,
    onMarkTask,
    onDragTask,
  } = useTask(newTask);
  const { openToast, setOpenToast, handleToast } = useToast()

  const allTasksCreated = tasks.length;
  const allTasksFinished = tasks.filter(task => task.done).length;
  const tasksProgress =
    allTasksCreated > 0
      ? `${allTasksFinished} de ${allTasksCreated}`
      : allTasksCreated;

  const handleNewTaskOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    if (clearField) {
      setNewTask("");
    }
  }, [clearField]);

  useEffect(() => {
    if (taskStatus.title && taskStatus.description) {
      handleToast()
    }
  }, [taskStatus])

  return (
    <>
      <form onSubmit={onCreateNewTask}>
        <div className={styles.createTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            name="addTask"
            value={newTask}
            onChange={handleNewTaskOnChange}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} weight="bold" />
          </button>
        </div>
      </form>
      <div className={styles.container}>
        <div className={styles.counters}>
          <div className={styles.allTasks}>
            <p>
              Tarefas criadas <span>{allTasksCreated}</span>
            </p>
          </div>

          <div className={styles.finishedTasks}>
            <p>
              Concluídas <span>{tasksProgress}</span>
            </p>
          </div>
        </div>

        {tasks.length > 0 ? (
          <DragDropContext onDragEnd={onDragTask}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.withContent}
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <Task
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          taskContent={task}
                          onDeleteTask={onDeleteTask}
                          onMarkTask={onMarkTask}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className={styles.empty}>
            <img src={emptyClipboard} alt="Dashboard vazio" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
        <Toast
          open={openToast}
          setOpen={setOpenToast}
          status={taskStatus}
        />
      </div>
    </>
  );
}
