import { LogMongoModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogModel, LogSeverityLevel } from '../../domain/models/log.model';

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogModel): Promise<void> {
    const newLog = await LogMongoModel.create(log);

    console.log('Mongo Log created: ', newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogModel[]> {
    const logs = await LogMongoModel.find({ level: severityLevel });

    return logs.map(mongoLog => LogModel.fromObject(mongoLog));
  }
}
