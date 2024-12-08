export type LogSeverityLevel = 'low' | 'medium' | 'high';

export interface LogModelOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogModel {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogModelOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogModel => {
    json = json === '' ? '{}' : json;

    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogModel({
      message,
      level,
      createdAt,
      origin,
    });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogModel => {
    const { message, level, createdAt, origin } = object;

    const log = new LogModel({ message, level, createdAt, origin });

    return log;
  };
}
