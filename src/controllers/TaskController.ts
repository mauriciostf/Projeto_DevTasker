import { Request, Response } from 'express';
import { AppDataSource } from '../dataSource';
import { Task } from '../models/Task';
import { User } from '../models/User';

export class TaskController {
  // Criar nova tarefa
  static async create(req: Request, res: Response) {
    const { title, description, status, deliveryDate } = req.body;
    const userId = req.userId;

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      const task = new Task(title, description, status, new Date(deliveryDate));
      task.user = user;

      const savedTask = await AppDataSource.getRepository(Task).save(task);
      return res.status(201).json(savedTask);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao criar tarefa', error: err });
    }
  }

  // Listar todas as tarefas (admin ou debug)
  static async findAll(req: Request, res: Response) {
    try {
      const tasks = await AppDataSource.getRepository(Task).find({
        relations: ['user']
      });
      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar tarefas', error: err });
    }
  }

  // Listar tarefas do usuário logado
  static async findMine(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const tasks = await AppDataSource.getRepository(Task).find({
        where: { user: { id: userId } }
      });

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar suas tarefas', error: err });
    }
  }

  // Atualizar uma tarefa
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, status, deliveryDate } = req.body;

    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOne({ where: { id: parseInt(id) }, relations: ['user'] });

      if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

      if (task.user.id !== req.userId)
        return res.status(403).json({ message: 'Você não pode editar esta tarefa' });

      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.status = status ?? task.status;
      task.deliveryDate = deliveryDate ? new Date(deliveryDate) : task.deliveryDate;

      const updated = await taskRepository.save(task);
      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao atualizar tarefa', error: err });
    }
  }

  // Deletar uma tarefa
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOne({ where: { id: parseInt(id) }, relations: ['user'] });

      if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

      if (task.user.id !== req.userId)
        return res.status(403).json({ message: 'Você não pode deletar esta tarefa' });

      await taskRepository.remove(task);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao deletar tarefa', error: err });
    }
  }
}
