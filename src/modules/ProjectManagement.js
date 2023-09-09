import { Project } from "../util/classes";
import LocalStorage from "./LocalStorage";
import TaskManagement from "./TaskManagement";

const ProjectManagement = (() => {
    let projects = LocalStorage.getData('projects') || [];

    // Reconstruct Project instances from serialized data
    projects = projects.map(projectData => {
        const project = new Project(projectData.title);
        if (projectData.tasks) {
            projectData.tasks.forEach(taskData => {
                const task = TaskManagement.createTask(taskData.title, taskData.description, taskData.dueDate);
                task.completed = taskData.completed;
                project.addTask(task);
            });
        }
        return project;
    });

    const createProject = (title) => {
        const newProject = new Project(title);
        projects.push(newProject);
        return newProject;
    }

    const addTaskToProject = (project, task) => {
        project.addTask(task);
      };

    
    const deleteTask = (project, task) => {
        project.removeTask(task);
    }

    const getAllProjects = () => Array.isArray(projects) ? [...projects] : [];
    
    const getProjectById = (projectId) => {
        return projects.find(project => project.id === projectId);
    };

    return {
        createProject,
        addTaskToProject,
        deleteTask,
        getAllProjects,
        getProjectById
    }
})();

export default ProjectManagement