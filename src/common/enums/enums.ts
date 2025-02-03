export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgent = 3,
  Later = 4,
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}
