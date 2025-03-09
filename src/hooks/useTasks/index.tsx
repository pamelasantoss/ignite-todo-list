import { FormEvent, useState } from "react";

export const useTask = (value: string) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [tasksDone, setTasksDone] = useState<string[]>([]);
  const [clearField, setClearField] = useState(false);

  const onCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const taskAlreadyCreated = tasks.find((task) => task === value);
    if (taskAlreadyCreated) {
      alert("Essa tarefa já foi criada!");
    } else {
      setTasks([...tasks, value]);
      setClearField(true);
    }

    setTimeout(() => {
      setClearField(false);
    }, 1000);
  };

  const onDeleteTask = (taskToDelete: string) => {
    const allTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(allTasks);
  };

  const onMarkTask = (taskToMark: string) => {
    const allTasksMarkAsDone = tasksDone;
    const hasTask = allTasksMarkAsDone.find((task) => task === taskToMark);

    if (hasTask) {
      const removeTaskFromTheList = tasksDone.filter(
        (task) => task !== taskToMark
      );
      setTasksDone(removeTaskFromTheList);
    } else {
      setTasksDone([...tasksDone, taskToMark]);
    }
  };

  return {
    tasks,
    tasksDone,
    clearField,
    onCreateNewTask,
    onDeleteTask,
    onMarkTask,
  };
};
