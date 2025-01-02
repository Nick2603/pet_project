import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class CronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, interval: CronExpression, func: () => void) {
    const job = new CronJob(interval, () => {
      func();
    });

    this.schedulerRegistry.addCronJob(name, job);

    job.start();

    console.warn(`job ${name} added with interval: ${interval}.`);
  }
}
