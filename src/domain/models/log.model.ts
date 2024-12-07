export type LogSeverityLevel = 'low' | 'medium' | 'high';

export class LogModel {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogModel => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogModel(message, level);
    log.createdAt = new Date(createdAt);

    return log;
  };
}
