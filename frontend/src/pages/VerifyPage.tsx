import { useState } from 'react'
import { api } from '../services/api'

export default function VerifyPage() {
  const [form, setForm] = useState({
    employeeId: '',
    certificationCode: ''
  })
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await api.verify(form)
      setResult(res)
    } catch (err: any) {
      setError(err?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Verify Credential</h2>
      <form onSubmit={submit} className="grid gap-3 max-w-xl">
        {(
          [
            ['employeeId','Employee ID'],
            ['certificationCode','Certification Code']
          ] as const
        ).map(([key,label]) => (
          <label key={key} className="grid gap-1">
            <span className="text-sm text-gray-700">{label}</span>
            <input
              className="border rounded px-3 py-2"
              value={(form as any)[key]}
              onChange={e => setForm(prev => ({...prev, [key]: e.target.value}))}
              required
            />
          </label>
        ))}
        <button disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50">
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {result && (
        <div className="mt-4 text-sm">
          {result.verified ? (
            <div>
              <p className="text-green-700">Certification is valid.</p>
              <p>Issued by: {result.details?.issuedBy}</p>
              <p>Timestamp: {result.details?.timestamp}</p>
            </div>
          ) : (
            <p className="text-red-700">Certification not found.</p>
          )}
        </div>
      )}
    </div>
  )
}


