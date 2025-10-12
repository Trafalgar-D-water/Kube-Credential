export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      <span className="text-sm text-gray-600">Processing...</span>
    </div>
  )
}
