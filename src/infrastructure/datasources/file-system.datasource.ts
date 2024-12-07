import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogModel, LogSeverityLevel } from '../../domain/models/log.model';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
      if (fs.existsSync(path)) return;

      fs.writeFileSync(path, '');
    });
  };

  saveLog(log: LogModel): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogModel> {
    throw new Error('Method not implemented.');
  }
}