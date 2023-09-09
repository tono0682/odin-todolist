import LocalStorage from "../modules/LocalStorage";
import ProjectManagement from "../modules/ProjectManagement";
import { Task } from "./classes";
import UIHandler from "../modules/UI";

export function createTaskGallery(projects) {
    const galleryContainer = document.createElement('div');
    galleryContainer.setAttribute('id','gallery-container');

    const galleryHeaderContainer = document.createElement('div');
    galleryHeaderContainer.setAttribute('id','gallery-header-container');

    const headerProjectName = document.createElement('h3');
    headerProjectName.innerText = 'Project';
    
    const headerTaskName = document.createElement('h3');
    headerTaskName.innerText ='Task';
    
    const headerTaskDescription = document.createElement('h3');
    headerTaskDescription.innerText = 'Description';
    
    const headerDueDate = document.createElement('h3');
    headerDueDate.innerText = 'Due Date';

    const headerCompletionStatus = document.createElement('h3');
    headerCompletionStatus.innerText = 'Status';

    const tasksContainer = generateTaskList(projects);

    appendElements(
        galleryHeaderContainer,
        headerProjectName,
        headerTaskName,
        headerTaskDescription,
        headerDueDate,
        headerCompletionStatus
    );

    appendElements(
        galleryContainer,
        galleryHeaderContainer,
        tasksContainer
    );

    return galleryContainer
}

export function generateTaskForm() {
    const form = document.createElement('form');
    form.id = 'task-form';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Task Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'task-title-input';
    titleInput.required = true;

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Task Description:';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'task-description-input';

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date:';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'task-due-date-input';
    dueDateInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Task';
    
    const cancelButton =document.createElement('button');
    cancelButton.id = 'task-cancel-btn';
    cancelButton.textContent = "Cancel";

    appendElements(
        form,
        titleLabel,
        titleInput,
        descriptionLabel,
        descriptionInput,
        dueDateLabel,
        dueDateInput,
        submitButton,
        cancelButton
    );
    
    return form
}

export function generateTaskList(projects) {

    const tasksContainer = document.createElement('div');
    tasksContainer.id = "tasks-container";

    // const tasks = projects.flatMap(project => project.tasks);

    projects.forEach(project => {
        project.tasks.forEach(task => {
            const taskItemContainer = document.createElement('div');
            taskItemContainer.classList.add('task-container');
            taskItemContainer.dataset.taskId = task.id;
            taskItemContainer.setAttribute('data-isComplete', task.completed ? 'true':'false');
    
            const taskProject = document.createElement('p');
            taskProject.innerText = project.title;
            const taskTitle = document.createElement('p');
            taskTitle.innerText = task.title;
            const taskDescription = document.createElement('p');
            taskDescription.innerText = task.description;
            const taskDueDate = document.createElement('p');
            taskDueDate.innerText = task.dueDate;
            const taskStatus = document.createElement('input');
            taskStatus.type = "checkbox";
            taskStatus.checked = task.completed;
                        
            taskStatus.addEventListener('change', (e) => {
                e.target.checked ? task.markAsComplete(): task.markAsIncomplete();
                LocalStorage.saveData('projects', ProjectManagement.getAllProjects());
            })




            const editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid', 'fa-pencil');
            
            // Modal Event Listener
            // Get the modal
            const modal = document.getElementById("editModal");
            // When the user clicks on the button, open the modal
            editIcon.addEventListener('click', () => {
                const taskTitleInput = document.getElementById('editTaskTitle');
                const taskDescriptionInput = document.getElementById('editTaskDescription');
                const taskDueDateInput = document.getElementById('editTaskDueDate');
                const updateTaskBtn = document.getElementById('updateTaskBtn');
                
                taskTitleInput.value = task.title;
                taskDescriptionInput.value = task.description;
                taskDueDateInput.value = task.dueDate;

                // Set the task ID in the data-task-id attribute
                updateTaskBtn.setAttribute('data-task-id', task.id);

                modal.style.display = "block";

            }) 
            

            // Delete Function
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-solid', 'fa-delete-left');

            deleteIcon.addEventListener('click', (e) => {
                ProjectManagement.deleteTask(project, task);
                LocalStorage.saveData('projects', ProjectManagement.getAllProjects());

                const activeProjectId = document.querySelector('.active').getAttribute('data-project-id');

                console.log(activeProjectId);


                if (activeProjectId) {
                    const project = ProjectManagement.getProjectById(activeProjectId);
                    UIHandler.renderMainContent(project.title, [project] );
                } else {
                    UIHandler.renderMainContent('View All Tasks', ProjectManagement.getAllProjects());
                }

                
            })
    
    
            appendElements(
                taskItemContainer,
                taskProject,
                taskTitle,
                taskDescription,
                taskDueDate,
                taskStatus,
                editIcon,
                deleteIcon
            )
            
            tasksContainer.appendChild(taskItemContainer);
        
        });
    })

    
    return tasksContainer
}


export function createProjectBtn(project) {
    const btn = document.createElement('button');
    const icon = document.createElement('i');
    btn.dataset.projectId = project.id;
    btn.dataset.date = "all";
    icon.classList.add('fa-solid', 'fa-folder');
    btn.innerText = project.title;
    btn.classList.add('nav-btn', 'project')
    btn.prepend(icon);

    return btn
}

export function appendElements(parent, ...elements) {
    elements.forEach(element => parent.appendChild(element));
}