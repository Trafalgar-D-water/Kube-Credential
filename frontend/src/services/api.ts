// src/api.ts

// Import the base URLs from environment variables
const ISSUANCE_BASE = import.meta.env.VITE_ISSUANCE_API_BASE || 'http://localhost:8080'
const VERIFICATION_BASE = import.meta.env.VITE_VERIFICATION_API_BASE || 'http://localhost:8081'

// Your generic http helper function remains the same
async function http<T>(path: string, opts: RequestInit): Promise<T> {
  const res = await fetch(path, { 
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body?.message || `Request failed: ${res.status}`)
  }
  return body
}

export const api = {
  issue: (payload: {
    employeeId: string
    employeeName: string
    certificationCode: string
    certificationName: string
    issuingManager?: string
  }) => http<{ message: string; certification?: { id: string; employeeId: string } }>(`${ISSUANCE_BASE}/issue`, { method: 'POST', body: JSON.stringify(payload) }),

  verify: (payload: { employeeId: string; certificationCode: string }) =>
    http<{ verified: boolean; message: string; details?: { issuedBy: string; timestamp: string } }>(`${VERIFICATION_BASE}/verify`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}