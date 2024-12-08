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

  private getLogsFromFile = (path: string): LogModel[] => {
    const content = fs.readFileSync(path, 'utf-8');

    if (content === '') return [];

    const logs = content.split('\n').map(log => LogModel.fromJson(log));

    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogModel[]> {
    switch (severityLevel) {
      case 'low':
        return this.getLogsFromFile(this.allLogsPath);

      case 'medium':
        return this.getLogsFromFile(this.mediumLogsPath);

      case 'high':
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
