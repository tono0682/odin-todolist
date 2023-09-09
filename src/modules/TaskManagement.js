import {Task} from '../util/classes';

const TaskManagement = (() => {
  const tasks = [];

  const createTask = (title, description, dueDate) => {
    const newTask = new Task(title, description, dueDate);
    tasks.push(newTask);
    return newTask;
  };

  const updateTask = (taskId, newTitle, newDescription, newDueDate) => {
    const taskToUpdate = getTaskById(taskId);
    
    if (taskToUpdate) {
      // Update the task's properties
      taskToUpdate.title = newTitle;
      taskToUpdate.description = newDescription;
      taskToUpdate.dueDate = newDueDate;
    } else {
        // Handle the case where the task with the provided ID is not found
        console.error(`Task with ID ${taskId} not found.`);
    }

  }

  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
  };

  const getAllTasks = () => [...tasks];


  return {
    createTask,
    updateTask,
    getAllTasks,
  };
})();

export default TaskManagement;
