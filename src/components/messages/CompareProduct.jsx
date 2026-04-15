import { products } from '../../data/products'

const compareProducts = [products[2], products[1]] // Shift Runner vs Vault Court Sneaker

const comparisonFields = [
  { label: 'Price', key: (p) => `$${p.price}` },
  { label: 'Width', key: (p) => p.comparison.width },
  { label: 'Toe Shape', key: (p) => p.comparison.toeShape },
  { label: 'Construction', key: (p) => p.comparison.construction },
  { label: 'Break-in', key: (p) => p.comparison.breakIn },
  { label: 'All-day Comfort', key: (p) => p.comparison.allDayComfort },
  { label: 'Weather', key: (p) => p.comparison.weather },
  { label: 'Resolable', key: (p) => p.comparison.resolable },
  { label: 'Fit Risk', key: (p) => p.comparison.fitRisk },
]

export default function CompareProduct({ onBuyNow }) {
  return (
    <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4 mb-4 w-4/5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.66667 14.6667V13.3333H1.33333C0.966667 13.3333 0.652778 13.2028 0.391667 12.9417C0.130556 12.6806 0 12.3667 0 12V2.66667C0 2.3 0.130556 1.98611 0.391667 1.725C0.652778 1.46389 0.966667 1.33333 1.33333 1.33333H4.66667V0H6V14.6667H4.66667ZM1.33333 11.3333H4.66667V7.33333L1.33333 11.3333ZM7.33333 13.3333V7.33333L10.6667 11.3333V2.66667H7.33333V1.33333H10.6667C11.0333 1.33333 11.3472 1.46389 11.6083 1.725C11.8694 1.98611 12 2.3 12 2.66667V12C12 12.3667 11.8694 12.6806 11.6083 12.9417C11.3472 13.2028 11.0333 13.3333 10.6667 13.3333H7.33333Z" fill="#1F1F1F"/>
        </svg>
        <h3 className="text-lg font-bold text-gray-900">Compare Product</h3>
      </div>

      {/* Product cards row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {compareProducts.map((product, idx) => (
          <div
            key={product.id}
            className={`rounded-[12px] p-4 pb-4 ${
              idx === 0
                ? 'border border-transparent'
                : 'border border-gray-200'
            }`}
            style={
              idx === 0
                ? {
                    background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(20.41deg, rgba(15, 176, 234, 0.64) -2.26%, rgba(244, 255, 223, 0.8) 107.78%) border-box',
                    border: '1px solid transparent',
                  }
                : undefined
            }
          >
            {/* Image area */}
            <div className="bg-[#F5F5F5] rounded-[8px] p-4 flex items-center justify-center relative w-full h-[246px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
                }}
              />
              {idx === 0 && (
                <span
                  className="absolute bottom-3 right-3 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(98.73deg, #0FB0EA -10.9%, #F4FFDF 139.61%)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.5 3.5L12 5.5l-2.5 2.5L10 12l-3-2-3 2 .5-4L2 5.5l3.5-1L7 1z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
                  </svg>
                  AI recommended
                </span>
              )}
            </div>
            {/* Product name & description */}
            <div className="mt-3 px-1">
              <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison rows — 9 attributes */}
      <div className="space-y-3">
        {comparisonFields.map((field) => (
          <div key={field.label}>
            <div className="grid grid-cols-2 gap-4">
              {compareProducts.map((product, idx) => (
                <div key={product.id}>
                  <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                  <div
                    className="rounded-lg px-3 py-2.5"
                    style={{ background: idx === 0 ? 'rgba(15, 176, 234, 0.06)' : '#f9fafb' }}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {field.key(product)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart prompt */}
      <p className="text-sm text-gray-900 font-semibold mt-4">Would you like to add one of these to your cart?</p>

      {/* Buy now buttons */}
      <div className="grid grid-cols-2 gap-4 mt-3">
        {compareProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onBuyNow(product)}
            className="w-full bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors h-[36px]"
          >
            Buy now
          </button>
        ))}
      </div>

      {/* Fit Risk Assessment */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Fit Risk Assessment</h4>
        <div className="space-y-2">
          {compareProducts.map((product) => (
            <div key={product.id} className="flex items-start gap-2">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded flex-shrink-0">
                {product.comparison.fitRisk}
              </span>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{product.name}</span> — {product.comparison.fitRiskNote}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Recommendation</h4>
        <div className="space-y-2">
          {compareProducts.map((product) => (
            <p key={product.id} className="text-sm text-gray-700">
              <span className="font-medium">{product.name}</span> — {product.comparison.recommendation}
            </p>
          ))}
        </div>
      </div>

    </div>
  )
}
