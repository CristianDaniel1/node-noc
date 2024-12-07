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
}
