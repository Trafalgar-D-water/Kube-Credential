import { useState } from 'react'
import { api } from '../services/api'

export default function IssuePage() {
  const [form, setForm] = useState({
    employeeId: '',
    employeeName: '',
    certificationCode: '',
    certificationName: '',
    issuingManager: ''
  })
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    try {
      const res = await api.issue(form)
      setResult(res.message)
    } catch (err: any) {
      setResult(err?.message || 'Failed to issue credential')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Issue Credential</h2>
      <form onSubmit={submit} className="grid gap-3 max-w-xl">
        {(
          [
            ['employeeId','Employee ID'],
            ['employeeName','Employee Name'],
            ['certificationCode','Certification Code'],
            ['certificationName','Certification Name'],
            ['issuingManager','Issuing Manager']
          ] as const
        ).map(([key,label]) => (
          <label key={key} className="grid gap-1">
            <span className="text-sm text-gray-700">{label}</span>
            <input
              className="border rounded px-3 py-2"
              value={(form as any)[key]}
              onChange={e => setForm(prev => ({...prev, [key]: e.target.value}))}
              required={key !== 'issuingManager'}
            />
          </label>
        ))}
        <button disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50">
          {loading ? 'Issuing...' : 'Issue'}
        </button>
      </form>
      {result && <p className="mt-4 text-sm">{result}</p>}
    </div>
  )
}


