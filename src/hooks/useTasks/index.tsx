import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string
  content: string
  done: boolean
}

interface DragTaskResult {
  source: {
    index: number
  }
  destination: {
    index: number
  } | null
}

export interface TaskStatus {
  title: string
  description: string
}

export const useTask = (value: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [clearField, setClearField] = useState(false);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>({ title: '', description: '' })

  const onCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const taskAlreadyCreated = tasks.find((task) => task.content === value);
    if (taskAlreadyCreated) {
      alert("Essa tarefa já foi criada!");
    } else {
      setTasks([...tasks, { id: uuidv4(), content: value, done: false }]);
      setClearField(true);
      setTaskStatus({ title: 'Nova tarefa', description: 'Tarefa criada com sucesso!' })
    }

    setTimeout(() => {
      setClearField(false);
    }, 1000);
  };

  const onDeleteTask = (taskToDelete: string) => {
    const allTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(allTasks);
    setTaskStatus({ title: 'Tarefa excluída', description: 'Tarefa excluída com sucesso!' })
  };

  const onMarkTask = (taskToMark: string) => {
    const newTasksUpdate = tasks.map(task => 
      task.id === taskToMark ? { ...task, done: !task.done } : task
    );
    setTasks(newTasksUpdate);

    const hasTask = tasks.find((task) => task.id === taskToMark && task.done === true);

    if (hasTask) {
      setTaskStatus({ title: 'Tarefa desmarcada', description: 'Sua tarefa concluída foi desmarcada!' })
    } else {
      setTaskStatus({ title: 'Tarefa concluída', description: 'Tarefa concluída com sucesso!' })
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
    clearField,
    taskStatus,
    onCreateNewTask,
    onDeleteTask,
    onMarkTask,
    onDragTask
  };
};
