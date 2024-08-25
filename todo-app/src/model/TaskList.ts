import TaskItem from "./TaskItem";

export default class TaskList {
    private _tasks: TaskItem[] = [];

    get tasks(): TaskItem[] {
        return this._tasks;
    }

    loadFromLocalStorage(): void {
        const storedTasks: string | null = localStorage.getItem("myTodo");
        if (!storedTasks) return;

        const parsedTaskList: {

            _id: string;
            _task: string;
            _completed: boolean;
        }[] = JSON.parse(storedTasks);

        parsedTaskList.forEach((taskObj) => {
            const newTaskList = new TaskItem(
                taskObj._id,
                taskObj._task,
                taskObj._completed
            );

            this.addTask(newTaskList);
        });
    }

    saveInLocalStorage(): void {
        localStorage.setItem("myTodo", JSON.stringify(this._tasks));
    }

    clearTask(): void {     
            this._tasks = [];
            localStorage.removeItem("myTodo");        
    }

    addTask(taskObj: TaskItem): void {
        this._tasks.push(taskObj);
        this.saveInLocalStorage();
    }

    removeTask(id: string): void {
        this._tasks = this._tasks.filter((task) => task.id !== id);
        this.saveInLocalStorage();
    }

    editTask(id: string, newTaskText: string): void {
        if (newTaskText.trim() === "") return;

        const taskToUpdate = this._tasks.find(task => task.id === id);
        if (!taskToUpdate) return;
        taskToUpdate.task = newTaskText;
        this.saveInLocalStorage();
    }

    toggleTaskChange(id: string): void {
        const taskToUpdateChange = this._tasks.find((task) => task.id === id);
        if (!taskToUpdateChange) return;
        taskToUpdateChange.completed = !taskToUpdateChange.completed;
        this.saveInLocalStorage();
    }

    getCompletedTask(): TaskItem[] {
        const completedTask = this._tasks.filter((task) => task.completed);
        return completedTask;
    }

    getPendingTask(): TaskItem[] {
        const pendingTask = this._tasks.filter((task) => !task.completed);
        return pendingTask;
    }


}