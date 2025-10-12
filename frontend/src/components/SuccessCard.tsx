import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface SuccessCardProps {
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  details?: {
    issuedBy?: string
    timestamp?: string
    certificationId?: string
    employeeId?: string
  }
}

export default function SuccessCard({ type, title, message, details }: SuccessCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-8 w-8 text-green-500" />
      case 'error':
        return <XCircleIcon className="h-8 w-8 text-red-500" />
      case 'info':
        return <InformationCircleIcon className="h-8 w-8 text-blue-500" />
    }
  }

  const getCardStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'error':
        return 'border-red-200 bg-red-50'
      case 'info':
        return 'border-blue-200 bg-blue-50'
    }
  }

  const getTitleStyles = () => {
    switch (type) {
      case 'success':
        return 'text-green-800'
      case 'error':
        return 'text-red-800'
      case 'info':
        return 'text-blue-800'
    }
  }

  const getMessageStyles = () => {
    switch (type) {
      case 'success':
        return 'text-green-700'
      case 'error':
        return 'text-red-700'
      case 'info':
        return 'text-blue-700'
    }
  }

  return (
    <div className={`rounded-lg border-2 p-6 shadow-lg ${getCardStyles()}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${getTitleStyles()}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm ${getMessageStyles()}`}>
            {message}
          </p>
          {details && (
            <div className="mt-4 space-y-2">
              {details.issuedBy && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Issued By:</span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{details.issuedBy}</span>
                </div>
              )}
              {details.timestamp && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Issued On:</span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                    {new Date(details.timestamp).toLocaleString()}
                  </span>
                </div>
              )}
              {details.certificationId && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Certification ID:</span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{details.certificationId}</span>
                </div>
              )}
              {details.employeeId && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Employee ID:</span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{details.employeeId}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
