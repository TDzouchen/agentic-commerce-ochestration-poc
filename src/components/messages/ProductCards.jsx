import { products } from '../../data/products'

export default function ProductCards({ onBuyNow }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-[12px] overflow-hidden p-4"
        >
          {/* Product image */}
          <div className="bg-[#F5F5F5] rounded-[8px] flex items-center justify-center h-[180px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[90%] max-w-[90%] object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect fill="%23f3f4f6" width="120" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Product</text></svg>'
              }}
            />
          </div>
          {/* Product info */}
          <div className="pt-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
              </div>
              {product.inStock && (
                <span className="text-xs text-gray-500 bg-[#EEF0F2] rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                  In-stock
                </span>
              )}
            </div>
            <div className="mt-3 mb-3">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xs text-gray-500 ml-1">USD</span>
            </div>
            <div className="flex gap-2 items-stretch">
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors h-[30px]"
              >
                Buy now
              </button>
              <button className="flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0 w-[30px] h-[30px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H26C28.2091 0 30 1.79086 30 4V26C30 28.2091 28.2091 30 26 30H4C1.79086 30 0 28.2091 0 26V4Z" fill="#CCE4C9"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.4404 8.61985C14.7004 8.22665 15.2802 8.22665 15.5469 8.61985L18.4736 12.9997H21.667C22.0337 12.9997 22.334 13.3001 22.334 13.6667L22.3135 13.8464L20.6201 20.0271C20.46 20.5867 19.947 20.9996 19.334 20.9997H10.667C10.0538 20.9997 9.54018 20.5869 9.38672 20.0271L7.69336 13.8464C7.67344 13.7865 7.667 13.7266 7.66699 13.6667C7.66699 13.3001 7.96732 12.9997 8.33398 12.9997H11.5137L14.4404 8.61985ZM15 15.6667C14.2669 15.6669 13.6671 16.2666 13.667 16.9997C13.667 17.733 14.2668 18.3335 15 18.3337C15.7333 18.3337 16.334 17.7331 16.334 16.9997C16.3339 16.2665 15.7333 15.6667 15 15.6667ZM13.1201 12.9997H16.8672L14.9941 10.1931L13.1201 12.9997Z" fill="#1F1F1F"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
