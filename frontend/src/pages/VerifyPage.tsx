import { useState } from 'react'
import { api } from '../services/api'
import SuccessCard from '../components/SuccessCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function VerifyPage() {
  const [form, setForm] = useState({
    employeeId: '',
    certificationCode: ''
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await api.verify(form)
      if (res.verified) {
        setResult({
          type: 'success',
          title: 'Credential Verified Successfully!',
          message: res.message,
          details: {
            issuedBy: res.details?.issuedBy,
            timestamp: res.details?.timestamp,
            employeeId: form.employeeId,
            certificationCode: form.certificationCode
          }
        })
      } else {
        setResult({
          type: 'error',
          title: 'Credential Not Found',
          message: res.message || 'The credential could not be verified'
        })
      }
    } catch (err: any) {
      setResult({
        type: 'error',
        title: 'Verification Failed',
        message: err?.message || 'An unexpected error occurred during verification'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Digital Credential</h1>
          <p className="text-gray-600">Validate the authenticity of a digital certification credential</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(
              [
                ['employeeId','Employee ID', 'Enter the employee identifier'],
                ['certificationCode','Certification Code', 'Enter the certification code to verify']
              ] as const
            ).map(([key, label, placeholder]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder={placeholder}
                  value={(form as any)[key]}
                  onChange={e => setForm(prev => ({...prev, [key]: e.target.value}))}
                  required
                />
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? <LoadingSpinner /> : 'Verify Credential'}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8">
            <SuccessCard 
              type={result.type}
              title={result.title}
              message={result.message}
              details={result.details}
            />
          </div>
        )}
      </div>
    </div>
  )
}


