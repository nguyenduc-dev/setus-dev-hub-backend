import { prisma } from '../prisma';
import { Faction } from '@prisma/client';
import { deleteImage } from '../utils/cloudinary';

export class CharacterService {
  async getAllCharacters() {
    return await prisma.character.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCharacterById(id: string) {
    return await prisma.character.findUnique({
      where: { id },
    });
  }

  async createCharacter(data: {
    name: string;
    type: Faction;
    hp?: number;
    level?: string;
    passiveSkill?: string;
    activeSkill?: string;
    specialSkill?: string;
    imageUrl?: string;
    winCondition?: string;
  }) {
    return await prisma.character.create({
      data,
    });
  }

  async updateCharacter(
    id: string,
    data: Partial<{
      name: string;
      type: Faction;
      hp: number;
      level: string;
      passiveSkill: string;
      activeSkill: string;
      specialSkill: string;
      imageUrl: string;
      winCondition: string;
    }>
  ) {
    // If the image is being updated, delete the old one from Cloudinary
    if (data.imageUrl) {
      const oldChar = await this.getCharacterById(id);
      if (oldChar?.imageUrl && oldChar.imageUrl !== data.imageUrl) {
        await deleteImage(oldChar.imageUrl);
      }
    }

    return await prisma.character.update({
      where: { id },
      data,
    });
  }

  async deleteCharacter(id: string) {
    const char = await this.getCharacterById(id);
    if (char?.imageUrl) {
      await deleteImage(char.imageUrl);
    }

    return await prisma.character.delete({
      where: { id },
    });
  }
}

export const characterService = new CharacterService();
