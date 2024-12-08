import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogModel, LogSeverityLevel } from '../../domain/models/log.model';

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogModel): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prismaClient.logPostgresModel.create({
      data: {
        ...log,
        level,
      },
    });

    console.log(newLog);

    console.log('Postgres log created!');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogModel[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prismaClient.logPostgresModel.findMany({
      where: { level },
    });

    const logs = dbLogs.map(dbLog => LogModel.fromObject(dbLog));

    return logs;
  }
}
