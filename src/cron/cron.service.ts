import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class CronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(
    name: string,
    interval: CronExpression,
    func: () => void,
  ): CronJob {
    const job = new CronJob(interval, () => {
      func();
    });

    this.schedulerRegistry.addCronJob(name, job);

    job.start();

    console.warn(`job ${name} added with interval: ${interval}.`);

    return job;
  }

  deleteCronJob(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);

    console.warn(`job ${name} deleted!`);
  }

  getCronJob(name: string): CronJob {
    return this.schedulerRegistry.getCronJob(name);
  }

  getCronJobs(): Map<string, CronJob> {
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((value, key) => {
      let next;

      try {
        next = value.nextDate().toJSDate();
      } catch {
        next = 'error: next fire date is in the past!';
      }

      console.log(`job: ${key} -> next: ${next}`);
    });

    return jobs;
  }
}
