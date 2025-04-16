import { AppDataSource } from "../dataSource";
import { Task } from "../models/Task";

export class TaskRepository {
  private taskRepository = AppDataSource.getRepository(Task);

  async createTask(userId: number, title: string, description: string, status: string, deliveryDate: Date) {
    const task = new Task(title, description, status, deliveryDate);
    task.user = { id: userId } as any;
    return await this.taskRepository.save(task);
  }

  async findAllTasks() {
    return await this.taskRepository.find({ relations: ["user"] });
  }

  async findTaskById(id: number) {
    return await this.taskRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async updateTask(id: number, fieldsToUpdate: Partial<Task>) {
    const task = await this.findTaskById(id);
    if (!task) return null;

    Object.assign(task, fieldsToUpdate);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.findTaskById(id);
    if (!task) return null;
    return await this.taskRepository.remove(task);
  }
}
