import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as cron from 'node-cron';
import { Room } from './entities/room.entity';

@Injectable()
export class CronJobService implements OnModuleInit {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async onModuleInit() {
    // Agende um cron job para rodar todo dia à meia-noite
    cron.schedule('* * * * *', async () => {
      const rooms = await this.roomRepository.find();

      for (const room of rooms) {
        if (room.checkOut === null) continue;
        if (room.checkOut < new Date()) {
          room.disponible = true;
          room.checkIn = null;
          room.checkOut = null;
          await this.roomRepository.save(room);
        }
      }

      console.log('Disponibilidade dos quartos atualizada');
    });
  }
}
