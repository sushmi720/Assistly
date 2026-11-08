import type {
  Task,
  Note,
  CalendarEvent,
  Integration,
  AvailabilityResult,
} from "@/types";

// Fixed reference: 2026-11-01 (matches project date context)
// Using static ISO strings avoids new Date() at module level during prerender.
const REF = "2026-11-01";
const REF_MS = new Date("2026-11-01T12:00:00.000Z").getTime();

function dISO(offsetMs: number): string {
  return new Date(REF_MS + offsetMs).toISOString();
}

function todayAt(h: number, m: number): string {
  return new Date(`2026-11-01T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000Z`).toISOString();
}

export const MOCK_USER = {
  id: "usr_01",
  cognitoSub: "cognito-sub-demo",
  email: "demo@assistly.ai",
  timezone: "America/New_York",
  name: "Alex Johnson",
  avatarUrl: undefined,
};

export const MOCK_TASKS: Task[] = [
  {
    id: "tsk_01",
    userId: "usr_01",
    title: "Submit Q4 financial report",
    description: "Compile and submit quarterly financials to CFO.",
    category: "Work",
    priority: "Urgent",
    status: "Pending",
    sourceChannel: "gmail",
    dueDate: dISO(0),
    createdAt: dISO(-86400000),
    updatedAt: dISO(0),
  },
  {
    id: "tsk_02",
    userId: "usr_01",
    title: "Team standup — Engineering",
    description: "Daily 15-min sync with engineering team.",
    category: "Meeting",
    priority: "High",
    status: "In Progress",
    sourceChannel: "outlook",
    dueDate: dISO(3600000),
    createdAt: dISO(-3600000),
    updatedAt: dISO(0),
  },
  {
    id: "tsk_03",
    userId: "usr_01",
    title: "Pay AWS invoice",
    description: "Monthly cloud infrastructure invoice due.",
    category: "Payment",
    priority: "High",
    status: "Pending",
    sourceChannel: "gmail",
    dueDate: dISO(86400000 * 2),
    createdAt: dISO(-7200000),
    updatedAt: dISO(0),
  },
  {
    id: "tsk_04",
    userId: "usr_01",
    title: "Review design mockups",
    description: "Provide feedback on new dashboard designs.",
    category: "Assignment",
    priority: "Medium",
    status: "In Progress",
    sourceChannel: "telegram",
    dueDate: dISO(86400000),
    createdAt: dISO(-10800000),
    updatedAt: dISO(0),
  },
  {
    id: "tsk_05",
    userId: "usr_01",
    title: "Doctor appointment confirmation",
    description: "Confirm 3pm appointment with Dr. Smith.",
    category: "Appointment",
    priority: "Low",
    status: "Completed",
    sourceChannel: "whatsapp",
    dueDate: dISO(86400000 * 3),
    createdAt: dISO(-14400000),
    updatedAt: dISO(0),
  },
  {
    id: "tsk_06",
    userId: "usr_01",
    title: "Product launch announcement",
    description: "Send launch announcement to all stakeholders.",
    category: "Announcement",
    priority: "Medium",
    status: "Pending",
    sourceChannel: "outlook",
    dueDate: dISO(86400000 * 5),
    createdAt: dISO(-18000000),
    updatedAt: dISO(0),
  },
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "evt_01",
    userId: "usr_01",
    title: "Engineering Standup",
    startTime: todayAt(9, 0),
    endTime: todayAt(9, 15),
    isExternal: false,
  },
  {
    id: "evt_02",
    userId: "usr_01",
    title: "Product Review Meeting",
    startTime: todayAt(11, 0),
    endTime: todayAt(12, 0),
    isExternal: true,
  },
  {
    id: "evt_03",
    userId: "usr_01",
    title: "Investor Call",
    startTime: todayAt(14, 30),
    endTime: todayAt(15, 30),
    isExternal: true,
  },
  {
    id: "evt_04",
    userId: "usr_01",
    title: "Design System Review",
    startTime: new Date("2026-11-02T10:00:00.000Z").toISOString(),
    endTime: new Date("2026-11-02T11:00:00.000Z").toISOString(),
    isExternal: false,
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "nte_01",
    userId: "usr_01",
    title: "AWS Architecture Notes",
    content:
      "## Aurora Serverless v2\n\nKey points:\n- Auto-scaling ACUs between 0.5 and 128\n- pgvector extension for semantic search\n- Row-level security per tenant",
    category: "Technical",
    createdAt: dISO(-86400000 * 2),
    updatedAt: dISO(-3600000),
  },
  {
    id: "nte_02",
    userId: "usr_01",
    title: "Q4 Planning Ideas",
    content:
      "## Revenue Targets\n\n- ARR goal: $2.4M\n- Focus on enterprise tier\n- Launch new integration marketplace",
    category: "Planning",
    createdAt: dISO(-86400000),
    updatedAt: dISO(-7200000),
  },
];

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "int_01",
    userId: "usr_01",
    provider: "gmail",
    status: "CONNECTED",
    connectedAt: dISO(-86400000 * 7),
  },
  {
    id: "int_02",
    userId: "usr_01",
    provider: "outlook",
    status: "CONNECTED",
    connectedAt: dISO(-86400000 * 3),
  },
  {
    id: "int_03",
    userId: "usr_01",
    provider: "whatsapp",
    status: "DISCONNECTED",
  },
  {
    id: "int_04",
    userId: "usr_01",
    provider: "telegram",
    status: "DISCONNECTED",
  },
];

export const MOCK_AVAILABILITY: AvailabilityResult = {
  date: REF,
  status: "Partially Free",
  busySlots: [
    { start: "09:00", end: "09:15", label: "Engineering Standup" },
    { start: "11:00", end: "12:00", label: "Product Review" },
    { start: "14:30", end: "15:30", label: "Investor Call" },
  ],
  freeSlots: [
    { start: "08:00", end: "09:00" },
    { start: "09:15", end: "11:00" },
    { start: "12:00", end: "14:30" },
    { start: "15:30", end: "18:00" },
  ],
};

export const AI_TICKER_MESSAGES = [
  "📩 Extracted task from Gmail: 'Submit Q4 report' — due today",
  "🤖 Bedrock processed 3 new messages from Outlook",
  "📅 Calendar sync: 2 new events detected via Google Calendar",
  "⚡ Urgent item flagged: AWS invoice due in 2 days",
  "🔗 WhatsApp integration ready to connect",
  "✅ Task 'Doctor appointment' marked complete via AI",
  "📊 Confidence score 0.94 — task auto-created from Telegram",
];
