export class CreateAiElkDto {
  service: string;
  from: number;
  to: number;
}

export class GoToAiElkDto {
  eventId: string; // 事件ID，用于识别是否是相同的告警
  expressionId: number; // 告警策略ID
  expressionName: string; // 告警策略名称
  endpoint: string; // 告警来源服务器/业务
  monitorName: string; // 告警名称（旧版）
  timestamp: number; // 事件发生时间戳
  status: number; // 告警的状态 0:正常 1:警告 2:严重
  grade: number; // 告警实例的等级 level1 - level4 共4级，其中 level1 最高
  msgType: string; // 事件类型，告警还是恢复。 枚举值： alert 或 recover
  level: number; // (已弃用)
  output: string; // 事件详细内容
  tags: Record<string, string>; // 标签
  data: Record<string, string>; // 附带的数据值
}

export enum AlarmStatus {
  Normal = 0,
  Warning = 1,
  Critical = 2,
}

export enum AlarmGrade {
  Level1 = 1,
  Level2 = 2,
  Level3 = 3,
  Level4 = 4,
}
