import { prisma } from '../prisma';

export class RegionService {
  async getAllRegions() {
    return await prisma.region.findMany({
      orderBy: { orderNumber: 'asc' },
    });
  }

  async getRegionById(id: string) {
    return await prisma.region.findUnique({
      where: { id },
    });
  }

  async createRegion(data: {
    orderNumber: number;
    nameAndDescription: string;
    effect?: string;
  }) {
    return await prisma.region.create({
      data,
    });
  }

  async updateRegion(
    id: string,
    data: Partial<{
      orderNumber: number;
      nameAndDescription: string;
      effect: string;
    }>
  ) {
    return await prisma.region.update({
      where: { id },
      data,
    });
  }

  async deleteRegion(id: string) {
    return await prisma.region.delete({
      where: { id },
    });
  }
}

export const regionService = new RegionService();
