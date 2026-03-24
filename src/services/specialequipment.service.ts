import { prisma } from '../prisma';
import { deleteImage } from '../utils/cloudinary';

export class SpecialEquipmentService {
  async getAllSpecialEquipment() {
    return await prisma.specialEquipment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSpecialEquipmentById(id: string) {
    return await prisma.specialEquipment.findUnique({
      where: { id },
    });
  }

  async createSpecialEquipment(data: {
    name: string;
    effect?: string;
    imageUrl?: string;
  }) {
    return await prisma.specialEquipment.create({
      data,
    });
  }

  async updateSpecialEquipment(
    id: string,
    data: Partial<{
      name: string;
      effect: string;
      imageUrl: string;
    }>
  ) {
    if (data.imageUrl) {
      const oldEquip = await this.getSpecialEquipmentById(id);
      if (oldEquip?.imageUrl && oldEquip.imageUrl !== data.imageUrl) {
        await deleteImage(oldEquip.imageUrl);
      }
    }

    return await prisma.specialEquipment.update({
      where: { id },
      data,
    });
  }

  async deleteSpecialEquipment(id: string) {
    const equip = await this.getSpecialEquipmentById(id);
    if (equip?.imageUrl) {
      await deleteImage(equip.imageUrl);
    }

    return await prisma.specialEquipment.delete({
      where: { id },
    });
  }
}

export const specialEquipmentService = new SpecialEquipmentService();
