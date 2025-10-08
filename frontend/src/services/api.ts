const BASE = import.meta.env.VITE_API_BASE || ''

async function http<T>(path: string, opts: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
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
  }) => http<{ message: string }>(`/issue`, { method: 'POST', body: JSON.stringify(payload) }),

  verify: (payload: { employeeId: string; certificationCode: string }) =>
    http<{ verified: boolean; details?: { issuedBy: string; timestamp: string } }>(`/verify`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}


