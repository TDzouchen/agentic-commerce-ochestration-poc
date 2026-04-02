import { products } from '../../data/products'

const compareProducts = [products[0], products[1]]

const comparisonFields = [
  { label: 'Price', key: 'price', format: (v) => `$${v} USD` },
  { label: 'Material', key: 'material' },
  { label: 'Weight', key: 'weight' },
  { label: 'Best for', key: 'bestFor' },
  { label: 'Agent advice', key: 'agentAdvice' },
]

export default function CompareProduct({ onBuyNow }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4v12M2 7l2 3-2 3M18 7l-2 3 2 3" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-base font-bold text-gray-900">Compare Product</h3>
      </div>

      {/* Product images row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {compareProducts.map((product, idx) => (
          <div key={product.id}>
            <div
              className={`rounded-xl p-4 flex items-center justify-center h-44 relative ${
                idx === 0 ? 'border-2 border-blue-200 bg-blue-50/30' : 'bg-gray-50'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
                }}
              />
              {idx === 0 && (
                <span className="absolute bottom-3 left-3 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  AI recommended
                </span>
              )}
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison rows */}
      <div className="space-y-4">
        {comparisonFields.map((field) => (
          <div key={field.key}>
            <div className="grid grid-cols-2 gap-4">
              {compareProducts.map((product) => (
                <div key={product.id}>
                  <p className="text-xs text-gray-500 mb-1">{field.label}</p>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {field.format
                        ? field.format(product[field.key])
                        : product[field.key] || '\u2014'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Buy now buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {compareProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onBuyNow(product)}
            className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Buy now
          </button>
        ))}
      </div>
    </div>
  )
}
