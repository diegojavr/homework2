import TaskItem from "../model/TaskItem";
import TaskList from "../model/TaskList";

interface Controller {
    getTaskList(): TaskItem[];
    addTask(newTask: TaskItem): void;
    deleteTask(taskId: string): void;
    editTask(taskId: string, newTaskText: string): void;

    loadTask(): void;
    clearTask(): void;
    saveTask(): void;

    toggleTaskChange(taskId: string): void;
    getPendingTask(): TaskItem[];
    getCompletedTask(): TaskItem[];
}

export default class TaskListController implements Controller {
    private _taskList: TaskList = new TaskList();

    constructor(){
        this.loadTask();
    }

    getTaskList(): TaskItem[] {
        return this._taskList.tasks;
    }
    addTask(newTask: TaskItem): void {
        this._taskList.addTask(newTask);
    }
    deleteTask(taskId: string): void {
        this._taskList.removeTask(taskId);
    }
    editTask(taskId: string, newTaskText: string): void {
        this._taskList.editTask(taskId, newTaskText);
    }
    loadTask(): void {
        this._taskList.loadFromLocalStorage();
    }
    clearTask(): void {
        this._taskList.clearTask();
    }
    saveTask(): void {
        this._taskList.saveInLocalStorage();
    }
    toggleTaskChange(taskId: string): void {
        this._taskList.toggleTaskChange(taskId);
    }
    getPendingTask(): TaskItem[] {
        const pendingTask = this._taskList.getPendingTask();
        return pendingTask;
    }
    getCompletedTask(): TaskItem[] {
        const completedTask = this._taskList.getCompletedTask();
        return completedTask;
    }

}