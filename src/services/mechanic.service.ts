import { prisma } from '../prisma';
import { MechanicCategory } from '@prisma/client';

export class MechanicService {
  async getAllMechanics() {
    return await prisma.mechanic.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMechanicsByCategory(category: MechanicCategory) {
    return await prisma.mechanic.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createMechanic(data: { category: MechanicCategory; rules: any }) {
    return await prisma.mechanic.create({ data });
  }

  async updateMechanic(id: string, data: Partial<{ category: MechanicCategory; rules: any }>) {
    return await prisma.mechanic.update({ where: { id }, data });
  }

  async deleteMechanic(id: string) {
    return await prisma.mechanic.delete({ where: { id } });
  }
}
export const mechanicService = new MechanicService();
