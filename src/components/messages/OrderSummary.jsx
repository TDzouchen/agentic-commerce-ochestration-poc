import { products } from '../../data/products'
import { user, order } from '../../data/user'

export default function OrderSummary() {
  const product = products.find((p) => p.id === order.productId)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 max-w-md">
      {/* Product info */}
      <div className="flex gap-4 mb-4">
        <div className="w-28 h-28 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="%23f3f4f6" width="80" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10">Product</text></svg>'
            }}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm text-gray-700 mt-1">Size ({order.size})</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-right mb-4">
        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        <span className="text-sm text-gray-500 ml-1">USD</span>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-gray-900">Subtotal</span>
          <span className="text-sm text-gray-900">${order.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Estimated Tax</span>
          <span className="text-sm text-gray-700">${order.tax}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Estimated shipping</span>
          <span className="text-sm text-gray-700">{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-amber-500 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {user.memberTier} member {Math.round(user.discount * 100)}% discount
          </span>
          <span className="text-sm text-amber-500">-${Math.abs(order.memberDiscount)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">${order.total}</span>
      </div>

      {/* Shipping to */}
      <div className="border-t border-gray-100 mt-4 pt-4">
        <h4 className="text-sm font-bold text-gray-900 mb-2">Shipping to</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-600">{user.address}</p>
          <p className="text-sm text-gray-600">{user.phone}</p>
        </div>
      </div>

      {/* Checkout button */}
      <button className="w-full mt-6 bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-full hover:bg-gray-800 transition-colors">
        Checkout
      </button>
    </div>
  )
}
