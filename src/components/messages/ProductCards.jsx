import { products } from '../../data/products'

export default function ProductCards({ onBuyNow }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          {/* Product image */}
          <div className="bg-gray-50 p-4 flex items-center justify-center h-40">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
              }}
            />
          </div>
          {/* Product info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              {product.inStock && (
                <span className="text-xs text-gray-500 whitespace-nowrap">In-stock</span>
              )}
            </div>
            <div className="mt-3 mb-4">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xs text-gray-500 ml-1">USD</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                Buy now
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5 1L3 4H1v2h1l1.5 7h7L12 6h1V4h-2L9 1H5zm0 1.5h4L10.5 5h-7L5 2.5zM4 8h6l-1 4H5L4 8z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
