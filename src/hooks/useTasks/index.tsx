import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string
  content: string
}

interface DragTaskResult {
  source: {
    index: number
  }
  destination: {
    index: number
  } | null
}

export const useTask = (value: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [clearField, setClearField] = useState(false);

  const onCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const taskAlreadyCreated = tasks.find((task) => task.content === value);
    if (taskAlreadyCreated) {
      alert("Essa tarefa já foi criada!");
    } else {
      setTasks([...tasks, { id: uuidv4(), content: value }]);
      setClearField(true);
    }

    setTimeout(() => {
      setClearField(false);
    }, 1000);
  };

  const onDeleteTask = (taskToDelete: string) => {
    const allTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(allTasks);
  };

  const onMarkTask = (taskToMark: string) => {
    const allTasksMarkAsDone = tasksDone;
    const hasTask = allTasksMarkAsDone.find((task) => task.content === taskToMark);

    if (hasTask) {
      const removeTaskFromTheList = tasksDone.filter(
        (task) => task.id !== taskToMark
      );
      setTasksDone(removeTaskFromTheList);
    } else {
      setTasksDone([...tasksDone, { id: taskToMark, content: '' }]);
    }
  };

  const onDragTask = (result: DragTaskResult) => {
    const { destination, source } = result;
  
    // Se o item não for solto em uma área válida, não faz nada
    if (!destination) {
      return;
    }
  
    // Se o item não mudar de posição, não faz nada
    if (destination.index === source.index) {
      return;
    }
  
    const updatedTasks = Array.from(tasks);
    const [movedItem] = updatedTasks.splice(source.index, 1); // Remove o item da posição original
    updatedTasks.splice(destination.index, 0, movedItem); // Adiciona o item na nova posição
  
    // Atualiza o estado com a nova ordem
    setTasks(updatedTasks)
  }

  return {
    tasks,
    tasksDone,
    clearField,
    onCreateNewTask,
    onDeleteTask,
    onMarkTask,
    onDragTask
  };
};
