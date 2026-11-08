// ─── User & Auth ────────────────────────────────────────────────────────────
export interface User {
  id: string;
  cognitoSub: string;
  email: string;
  timezone: string;
  name?: string;
  avatarUrl?: string;
}

// ─── Integrations ────────────────────────────────────────────────────────────
export type IntegrationProvider = "gmail" | "outlook" | "whatsapp" | "telegram";
export type IntegrationStatus = "CONNECTED" | "DISCONNECTED" | "PENDING";

export interface Integration {
  id: string;
  userId: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  secretArn?: string;
  connectedAt?: string;
}

// ─── Tasks ───────────────────────────────────────────────────────────────────
export type TaskCategory =
  | "Assignment"
  | "Meeting"
  | "Work"
  | "Payment"
  | "Appointment"
  | "Announcement";

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  sourceChannel?: string;
  dueDate?: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

// ─── Notes ───────────────────────────────────────────────────────────────────
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  category?: string;
  embedding?: number[]; // 1536-dim vector
  createdAt: string;
  updatedAt: string;
}

// ─── Calendar ────────────────────────────────────────────────────────────────
export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isExternal: boolean;
  description?: string;
  location?: string;
}

// ─── Bedrock AI Extraction ───────────────────────────────────────────────────
export interface BedrockExtractionResult {
  category: TaskCategory;
  title: string;
  actionableItem: string;
  dueDate: string | null;
  priority: TaskPriority;
  confidenceScore: number;
}

// ─── Availability ────────────────────────────────────────────────────────────
export type AvailabilityStatus =
  | "Fully Free"
  | "Partially Free"
  | "Fully Busy";

export interface TimeSlot {
  start: string; // HH:MM
  end: string;
  label?: string;
}

export interface AvailabilityResult {
  date: string;
  status: AvailabilityStatus;
  busySlots: TimeSlot[];
  freeSlots: TimeSlot[];
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}
