import type { CitizenProfile, DoctorStaff, VerificationItem, FhirAuditEvent } from '../types/health.ts';

export interface AppStateSnapshot {
  patients?: CitizenProfile[];
  doctors?: DoctorStaff[];
  verificationQueue?: VerificationItem[];
  auditLogs?: FhirAuditEvent[];
  meta?: { triageRedFlagsCount: number };
}

/**
 * Hydrates the full app snapshot from the MongoDB-backed /api/state endpoint.
 * Throws when the database is unreachable so callers can fall back to in-memory state.
 */
export async function loadAppState(): Promise<AppStateSnapshot> {
  const res = await fetch('/api/state');
  if (!res.ok) {
    throw new Error(`MongoDB load failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Persists the full app snapshot to MongoDB via /api/state.
 * Fire-and-forget friendly; failures are caught by the caller.
 */
export async function saveAppState(snapshot: AppStateSnapshot): Promise<void> {
  const res = await fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snapshot),
  });
  if (!res.ok) {
    throw new Error(`MongoDB save failed: ${res.status}`);
  }
}