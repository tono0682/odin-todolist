import './styles/styles.js'; // Import the central styles module

import TaskManagement from './modules/TaskManagement.js';
import ProjectManagement from './modules/ProjectManagement.js';
import './modules/ProjectManagement.js';
import LocalStorage from './modules/LocalStorage.js';
import UIHandler from './modules/UI.js';

const generalProjectExists = ProjectManagement.getAllProjects().some(project => project.title === 'General');
if (!generalProjectExists) {
    // If the 'General' project does not exist, create it
    const generalProject = ProjectManagement.createProject('General');
  
    // Save the updated list of projects to local storage
    LocalStorage.saveData('projects', ProjectManagement.getAllProjects());
}
UIHandler.initialize();

