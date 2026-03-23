import { prisma } from '../prisma';

export class TaskService {
  static async getAll() {
    return await prisma.task.findMany({
      orderBy: { order: 'asc' },
    });
  }

  static async getById(id: string) {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  static async create(data: { title: string; description?: string; status?: string; order?: number }) {
    return await prisma.task.create({
      data,
    });
  }

  static async update(id: string, data: { title?: string; description?: string; status?: string; order?: number }) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.task.delete({
      where: { id },
    });
  }

  static async reorder(tasks: { id: string; order: number; status: string }[]) {
    return await Promise.all(
      tasks.map((task) =>
        prisma.task.update({
          where: { id: task.id },
          data: { order: task.order, status: task.status },
        })
      )
    );
  }
}
