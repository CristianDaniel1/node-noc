import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log-repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...');

    // new SendEmailLogs(emailService, logRepository).execute([
    //   'noc.node@gmail.com',
    //   'noc.node2@gmail.com',
    // ]);

    // const logs = await logRepository.getLogs('low');
    // console.log(logs);

    // emailService.sendEmailWithFileSystemLogs([
    //   'noc.node@gmail.com',
    //   'noc.node2@gmail.com',
    // ]);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';

    //   new CheckServiceMultiple(
    //     [fsLogRepository, postgresLogRepository, mongoLogRepository],
    //     () => console.log(`${url} is ok`),
    //     error => console.log(error)
    //   ).execute(url);
    // });
  }
}
