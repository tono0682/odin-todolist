import generateUniqueId from "./idUtils";

class Task {
    constructor(title, description, dueDate) {
        this.id = generateUniqueId();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }

    markAsComplete() {
        this.completed = true;
    }

    markAsIncomplete() {
        this.completed = false;
    }
}

class Project {
    constructor(title) {
        this.id = generateUniqueId();
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }
}

export {Task, Project}