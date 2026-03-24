import { prisma } from '../prisma';
import { deleteImage } from '../utils/cloudinary';

export class MiniBossService {
  async getAllMiniBosses() {
    return await prisma.miniBoss.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMiniBossById(id: string) {
    return await prisma.miniBoss.findUnique({
      where: { id },
    });
  }

  async createMiniBoss(data: {
    bossName: string;
    hp: number;
    atk: number;
    effect?: string;
    bossReward?: string;
    imageUrl?: string;
  }) {
    return await prisma.miniBoss.create({
      data,
    });
  }

  async updateMiniBoss(
    id: string,
    data: Partial<{
      bossName: string;
      hp: number;
      atk: number;
      effect: string;
      bossReward: string;
      imageUrl: string;
    }>
  ) {
    if (data.imageUrl) {
      const oldBoss = await this.getMiniBossById(id);
      if (oldBoss?.imageUrl && oldBoss.imageUrl !== data.imageUrl) {
        await deleteImage(oldBoss.imageUrl);
      }
    }

    return await prisma.miniBoss.update({
      where: { id },
      data,
    });
  }

  async deleteMiniBoss(id: string) {
    const boss = await this.getMiniBossById(id);
    if (boss?.imageUrl) {
      await deleteImage(boss.imageUrl);
    }

    return await prisma.miniBoss.delete({
      where: { id },
    });
  }
}

export const miniBossService = new MiniBossService();
