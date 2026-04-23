import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type LeadType = "entrepreneur" | "cabinet";
export type PurchaseStatus = "initiated" | "succeeded" | "failed";

export interface LeadRecord {
  id: string;
  createdAt: string;
  type: LeadType;
  offerId: string;
  offerTitle: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  cabinetName?: string;
  responsableName?: string;
  nbDossiers?: string;
  note?: string;
}

export interface PurchaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  offerId: string;
  amount: number;
  currency: string;
  status: PurchaseStatus;
  source: "payment_intent" | "checkout_session";
  email?: string;
  customerName?: string;
  stripePaymentIntentId?: string;
}

interface AdminStore {
  leads: LeadRecord[];
  purchases: PurchaseRecord[];
}

const STORE_FILE_PATH = path.join(process.cwd(), "data", "admin-store.json");

let writeQueue = Promise.resolve();

function createInitialStore(): AdminStore {
  return { leads: [], purchases: [] };
}

async function ensureStoreFile() {
  const dir = path.dirname(STORE_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(STORE_FILE_PATH);
  } catch {
    await fs.writeFile(STORE_FILE_PATH, JSON.stringify(createInitialStore(), null, 2), "utf8");
  }
}

async function readStore(): Promise<AdminStore> {
  await ensureStoreFile();
  const raw = await fs.readFile(STORE_FILE_PATH, "utf8");
  const parsed = JSON.parse(raw) as Partial<AdminStore>;

  return {
    leads: Array.isArray(parsed.leads) ? parsed.leads : [],
    purchases: Array.isArray(parsed.purchases) ? parsed.purchases : [],
  };
}

async function writeStore(store: AdminStore) {
  await fs.writeFile(STORE_FILE_PATH, JSON.stringify(store, null, 2), "utf8");
}

function enqueueWrite<T>(operation: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.then(() => undefined, () => undefined);
  return next;
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export async function addLead(input: Omit<LeadRecord, "id" | "createdAt">) {
  return enqueueWrite(async () => {
    const store = await readStore();
    const record: LeadRecord = {
      id: createId("lead"),
      createdAt: new Date().toISOString(),
      ...input,
    };

    store.leads.unshift(record);
    await writeStore(store);
    return record;
  });
}

export async function addPurchase(input: Omit<PurchaseRecord, "id" | "createdAt" | "updatedAt">) {
  return enqueueWrite(async () => {
    const store = await readStore();
    const now = new Date().toISOString();
    const record: PurchaseRecord = {
      id: createId("purchase"),
      createdAt: now,
      updatedAt: now,
      ...input,
    };

    store.purchases.unshift(record);
    await writeStore(store);
    return record;
  });
}

export async function updatePurchaseStatusByPaymentIntent(paymentIntentId: string, status: PurchaseStatus) {
  return enqueueWrite(async () => {
    const store = await readStore();
    const purchase = store.purchases.find((item) => item.stripePaymentIntentId === paymentIntentId);

    if (!purchase) {
      return null;
    }

    purchase.status = status;
    purchase.updatedAt = new Date().toISOString();
    await writeStore(store);
    return purchase;
  });
}

export async function getAdminDashboardData() {
  const store = await readStore();

  return {
    leads: store.leads,
    purchases: store.purchases,
    stats: {
      totalLeads: store.leads.length,
      totalPurchases: store.purchases.length,
      succeededPurchases: store.purchases.filter((item) => item.status === "succeeded").length,
    },
  };
}
