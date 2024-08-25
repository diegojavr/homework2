import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from 'uuid';

import TaskItem from "./model/TaskItem";
import TaskListController from "./controller/TaskListController";
import HTMLTaskListView from "./view/TaskListView";

const taskListController = new TaskListController();
const taskListView = new HTMLTaskListView(taskListController);

//Accessing to DOM Elements
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;
const showCompletedTask = document.getElementById("completed-task") as HTMLButtonElement;
const showTaskToComplete = document.getElementById("task-to-complete") as HTMLButtonElement;
const showAllTask = document.getElementById("all-task") as HTMLButtonElement;


//Initializes the application
const initApp = () => {
  const allTask = taskListController.getTaskList();
  taskListView.render(allTask);
};

initApp();

if (todoForm) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(todoForm);
    const todoValue = formData.get("new-todo") as string;
    if (todoValue === null || todoValue?.toString().trim() === "") return;
    const newTask = new TaskItem(uuid(), todoValue.trim());

    taskListController.addTask(newTask);

    initApp();

    todoForm.reset();
  });
}

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    taskListController.clearTask();
    taskListView.clear();
  }
});

showCompletedTask.addEventListener("click", () => {
  const completedTask = taskListController.getCompletedTask();
  taskListView.render(completedTask);
});

showTaskToComplete.addEventListener("click", () => {
  const taskToComplete = taskListController.getPendingTask();
  taskListView.render(taskToComplete);
});

showAllTask.addEventListener("click", () => {
  const allTask = taskListController.getTaskList();
  taskListView.render(allTask);
})