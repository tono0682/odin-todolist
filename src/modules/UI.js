import { appendElements, createProjectBtn, createTaskGallery, generateTaskForm, generateTaskList } from "../util/domUtils";
import LocalStorage from "./LocalStorage";
import ProjectManagement from "./ProjectManagement";
import TaskManagement from "./TaskManagement";
import { Project } from "../util/classes";
import { set } from "date-fns";

const UIHandler = (() => {

    let selectedProject = {
        projectId: "",
        filter: "All"
    };

    const setupUIListeners = () => {
        const allTasksBtn = document.getElementById('all-tasks-btn');
        const addProjectBtn = document.getElementById('add-project-btn');
        const projectForm = document.getElementById('project-form');
        const cancelProjectBtn = document.getElementById('cancel-project-btn');
        const modal = document.getElementById("editModal");
        const updateTaskBtn = document.getElementById('updateTaskBtn');

        // Project event handlers
        allTasksBtn.addEventListener('click', () => {
            renderMainContent('View All Tasks', ProjectManagement.getAllProjects());
            setActiveNavBtn(allTasksBtn);
        })


        addProjectBtn.addEventListener( 'click', () => setElementVisibility(projectForm,true));

        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectNameInput = document.getElementById('project-name-input');
            const newProject = ProjectManagement.createProject(projectNameInput.value);
            LocalStorage.saveData('projects', ProjectManagement.getAllProjects());
            setElementVisibility(projectForm, false);
            renderMainContent(projectNameInput.value, [newProject] );
            renderProjectsList();
            const newProjectnavBtn = document.querySelector(`[data-project-id = "${newProject.id}"]`);
            setActiveNavBtn(newProjectnavBtn);
            projectNameInput.value = "";
        });

        cancelProjectBtn.addEventListener('click', () => setElementVisibility(projectForm,false));

        // Modal 
        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        });

        updateTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const taskTitleInput = document.getElementById('editTaskTitle');
            const taskDescriptionInput = document.getElementById('editTaskDescription');
            const taskDueDateInput = document.getElementById('editTaskDueDate');
            const taskId = e.target.dataset.taskId;
            
            TaskManagement.updateTask(
                taskId,
                taskTitleInput.value,
                taskDescriptionInput.value,
                taskDueDateInput.value
            );

            modal.style.display = "none";
            //UPDATE!!!! HOW CAN I UNDERSTNAD CURRENT STATE TO KNOW WHAT TO RENDER AFTER I FINISH UPDATING TO STAY ON THE SAME VIEW
            renderMainContent('tester', ProjectManagement.getAllProjects())

        } )


    }

    const setElementVisibility = (element, bool) => {
        const isVisible = bool ? 'true':'false';
        element.setAttribute('data-visible', isVisible);
    };

    const renderMainContent = (header, projects) => {
        const main = document.getElementById('main-content');
        main.innerText='';
        const mainHeader = document.createElement('h2');
        mainHeader.innerText = header;

        const addTaskBtn = document.createElement('button');
        addTaskBtn.innerText = "Add Task";
        addTaskBtn.setAttribute('id', 'add-task-btn');
        addTaskBtn.classList.add('color-accent');

        const taskForm = generateTaskForm();
        setElementVisibility(taskForm,false);

        const taskGalllery = createTaskGallery(projects);

        appendElements(
            main,
            mainHeader,
            addTaskBtn,
            taskForm,
            taskGalllery
        );

        // Task event handlers
        const cancelTaskBtn = document.getElementById('task-cancel-btn');

        addTaskBtn.addEventListener('click', () => setElementVisibility(taskForm, true));
        cancelTaskBtn.addEventListener('click', () => setElementVisibility(taskForm,false));
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const titleInput = document.getElementById('task-title-input');
            const descriptionInput = document.getElementById('task-description-input');
            const dueDateInput = document.getElementById('task-due-date-input');

            const formData = {
                title: titleInput.value,
                description: descriptionInput.value,
                dueDate: dueDateInput.value
            }

            const task = TaskManagement.createTask(
                formData.title,
                formData.description,
                formData.dueDate
            );

            // Get the first project (if available)
            if (projects.length === 1) {
                const firstProject = projects[0];
                // Add the task to the first project
                ProjectManagement.addTaskToProject(firstProject, task);

                // Save updated projects data to local storage
                LocalStorage.saveData('projects', ProjectManagement.getAllProjects());
            } else if(projects.length > 1) {
                // Add to General Project folder
                const generalProject = ProjectManagement.getAllProjects().find(project => project.title === 'General');
                ProjectManagement.addTaskToProject(generalProject, task);
            }else {
                // Handle the case where there are no projects yet
                alert("No projects available. Create a project first.");
            }

            // Clear form fields
            titleInput.value = '';
            descriptionInput.value = '';
            dueDateInput.value = '';

            // Hide the task form
            setElementVisibility(taskForm, false);

            // Show updates
            renderUpdateTasks(projects);
        })

    }

    const renderUpdateTasks = (projects) => {
        const galleryContainer = document.getElementById('gallery-container');
        const oldTasksContainer = document.getElementById('tasks-container');
        const newTasksContainer = generateTaskList(projects);

        galleryContainer.replaceChild(newTasksContainer, oldTasksContainer);
    }

    const renderProjectsList = () => {        
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerText = "";

        const projects = ProjectManagement.getAllProjects();
        projects.forEach(project => {
            const btn = createProjectBtn(project);

            btn.addEventListener('click', (e) => {
                const projectId = e.target.dataset.projectId;
                const project = ProjectManagement.getProjectById(projectId);
                setActiveNavBtn(btn);
                renderMainContent(project.title, [project]);
            });

            projectsContainer.appendChild(btn);
        });
    }

    const setActiveNavBtn = (btn) => {
        const activeBtn = document.querySelector('.active');
        if (activeBtn) {
            activeBtn.classList.remove('active');  
        }
        btn.classList.add('active')
    }

    const initialize = () => {
        setupUIListeners();
        renderMainContent('View All Tasks', ProjectManagement.getAllProjects());
        renderProjectsList();
    }

    return {
        renderMainContent,
        renderProjectsList,
        initialize
    }  
})();

export default UIHandler