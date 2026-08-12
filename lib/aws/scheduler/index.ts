// lib/aws/scheduler.ts
import { CreateScheduleCommand, SchedulerClient } from "@aws-sdk/client-scheduler";

export const scheduler = new SchedulerClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface TargetParams {
  Arn: string;
  RoleArn: string;
  Input: string; 
}

interface CreateCommandParams {
  name: string;
  scheduleExpression: string;
  flexibleTimeWindow: { Mode: "OFF" | "FLEXIBLE"; MaximumWindowInMinutes?: number };
  actionAfterCompletion?: "NONE" | "DELETE";
  target: TargetParams;
}

export function createScheduleCommand({
  name,
  scheduleExpression,
  flexibleTimeWindow,
  actionAfterCompletion = "DELETE",
  target,
}: CreateCommandParams): CreateScheduleCommand {
  return new CreateScheduleCommand({
    Name: name,
    ScheduleExpression: scheduleExpression,
    FlexibleTimeWindow: flexibleTimeWindow,
    ActionAfterCompletion: actionAfterCompletion,
    Target: {
      Arn: target.Arn,
      RoleArn: target.RoleArn,
      Input: target.Input,
    },
  });
}