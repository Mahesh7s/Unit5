// Responsible only for task-related logic
var TaskService = /** @class */ (function () {
    function TaskService() {
    }
    TaskService.prototype.createTask = function (name) {
        console.log("Creating task: ".concat(name));
    };
    return TaskService;
}());
// Responsible only for email-related logic
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.sendEmail = function (to) {
        console.log("Sending email to ".concat(to));
    };
    return EmailService;
}());
// Coordinates between services (but has no business logic itself)
var TaskManager = /** @class */ (function () {
    function TaskManager(taskService, emailService) {
        this.taskService = taskService;
        this.emailService = emailService;
    }
    TaskManager.prototype.createTaskAndNotify = function (name, email) {
        this.taskService.createTask(name);
        this.emailService.sendEmail(email);
    };
    return TaskManager;
}());
var taskService = new TaskService();
var emailService = new EmailService();
var taskManager = new TaskManager(taskService, emailService);
taskManager.createTaskAndNotify("Building a portfolio", "mokamahesh77@gmail.com");
