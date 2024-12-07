import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogModel, LogSeverityLevel } from '../../domain/models/log.model';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
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

  async saveLog(newLog: LogModel): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === 'low') return;

    if (newLog.level === 'medium') {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
      return;
    }

    fs.appendFileSync(this.highLogsPath, logAsJson);
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogModel> {
    throw new Error('Method not implemented.');
  }
}
