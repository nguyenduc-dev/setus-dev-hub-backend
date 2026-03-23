import { prisma } from '../prisma';
import { CardType } from '@prisma/client';
import { deleteImage } from '../utils/cloudinary';

export class CardService {
  async getAllCards() {
    return await prisma.card.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCardById(id: string) {
    return await prisma.card.findUnique({
      where: { id },
    });
  }

  async createCard(data: {
    name: string;
    type: CardType;
    effect?: string;
    imageUrl?: string;
  }) {
    return await prisma.card.create({
      data,
    });
  }

  async updateCard(
    id: string,
    data: Partial<{
      name: string;
      type: CardType;
      effect: string;
      imageUrl: string;
    }>
  ) {
    // If the image is being updated, delete the old one from Cloudinary
    if (data.imageUrl) {
      const oldCard = await this.getCardById(id);
      if (oldCard?.imageUrl && oldCard.imageUrl !== data.imageUrl) {
        await deleteImage(oldCard.imageUrl);
      }
    }

    return await prisma.card.update({
      where: { id },
      data,
    });
  }

  async deleteCard(id: string) {
    const card = await this.getCardById(id);
    if (card?.imageUrl) {
      await deleteImage(card.imageUrl);
    }
    
    return await prisma.card.delete({
      where: { id },
    });
  }
}

export const cardService = new CardService();
