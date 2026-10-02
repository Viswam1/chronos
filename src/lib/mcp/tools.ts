import { z } from "zod";

export type ToolResult = Record<string, unknown>;

export const tools = {
  start_pomodoro: {
    description: "Start a Pomodoro focus session.",
    schema: z.object({
      task: z.string(),
      duration_minutes: z.number().int().positive().default(25),
    }),
    handler: async ({
      task,
      duration_minutes,
    }: {
      task: string;
      duration_minutes: number;
    }): Promise<ToolResult> => ({
      technique: "pomodoro",
      task,
      focus_minutes: duration_minutes,
      break_minutes: 5,
      message: `Focus on '${task}' for ${duration_minutes} minutes. 🍅`,
    }),
  },

  plan_qin_han_day: {
    description: "Plan a Qin/Han-style 5AM–5PM workday.",
    schema: z.object({ priority_task: z.string() }),
    handler: async ({ priority_task }: { priority_task: string }): Promise<ToolResult> => ({
      technique: "qin_han",
      priority_task,
      plan: [
        { time: "05:00", activity: `Review the day; define success for: ${priority_task}` },
        { time: "07:00", activity: `Deep work block 1 — advance ${priority_task}` },
        { time: "11:00", activity: "Meal, walk, mental reset" },
        { time: "13:00", activity: `Deep work block 2 — refine ${priority_task}` },
        { time: "16:00", activity: "Wrap up, reply, tidy loose ends" },
        { time: "17:00", activity: "Close the day — journal one sentence" },
      ],
    }),
  },

  start_asante_cycle: {
    description: "Start a 42-day Adaduanan planning cycle.",
    schema: z.object({ start_date: z.string().optional() }),
    handler: async ({ start_date }: { start_date?: string }): Promise<ToolResult> => {
      const start = start_date ? new Date(start_date) : new Date();
      const end = new Date(start);
      end.setDate(end.getDate() + 41);
      return {
        technique: "asante_cycle",
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10),
        total_days: 42,
        weeks: 6,
      };
    },
  },

  start_flow: {
    description: "Begin an Egyptian water-clock flow session.",
    schema: z.object({
      intent: z.string(),
      minutes: z.number().int().positive().default(90),
    }),
    handler: async ({
      intent,
      minutes,
    }: {
      intent: string;
      minutes: number;
    }): Promise<ToolResult> => ({
      technique: "egyptian_flow",
      intent,
      minutes,
      message: `Let the water flow for ${minutes} minutes. Only '${intent}'.`,
    }),
  },

  build_graeco_roman_routine: {
    description: "Build a Greco-Roman daily routine.",
    schema: z.object({ goal: z.string() }),
    handler: async ({ goal }: { goal: string }): Promise<ToolResult> => ({
      technique: "greco_roman",
      goal,
      blocks: [
        { name: "Dawn — Lectio", minutes: 30, detail: "Read something difficult." },
        { name: "Morning — Disputatio", minutes: 120, detail: `Argue with: ${goal}` },
        { name: "Midday — Gymnasium", minutes: 45, detail: "Walk, let the mind idle." },
        { name: "Afternoon — Compositio", minutes: 120, detail: "Turn thinking into artefacts." },
        { name: "Evening — Examinatio", minutes: 20, detail: "Review in writing." },
      ],
    }),
  },
} as const;

export type ToolName = keyof typeof tools;
