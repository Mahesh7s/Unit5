// Responsible only for task-related logic
class TaskService {
  createTask(name: string): void {
    console.log(`Creating task: ${name}`);
  }
}

// Responsible only for email-related logic
class EmailService {
  sendEmail(to: string): void {
    console.log(`Sending email to ${to}`);
  }
}

// Coordinates between services (but has no business logic itself)
class TaskManager {
  private taskService: TaskService;
  private emailService: EmailService;

  constructor(taskService: TaskService, emailService: EmailService) {
    this.taskService = taskService;
    this.emailService = emailService;
  }

  createTaskAndNotify(name: string, email: string): void {
    this.taskService.createTask(name);
    this.emailService.sendEmail(email);
  }
}

const taskService = new TaskService();
const emailService = new EmailService();

const taskManager = new TaskManager(taskService, emailService);
taskManager.createTaskAndNotify("Building a portfolio", "mokamahesh77@gmail.com");
