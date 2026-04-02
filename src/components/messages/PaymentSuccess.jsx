import { products } from '../../data/products'
import { user, order } from '../../data/user'

export default function PaymentSuccess() {
  const product = products.find((p) => p.id === order.productId)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
      {/* Success header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10l3.5 3.5L15 7"
              stroke="#06B6D4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Payment success</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Your order has been received and is being processed
      </p>

      {/* Order summary card */}
      <div className="border border-gray-200 rounded-xl p-5">
        {/* Order header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Order summary</h3>
          <span className="text-sm text-gray-500">{order.id}</span>
        </div>

        {/* Product */}
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect fill="%23f3f4f6" width="60" height="60"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="8">Product</text></svg>'
              }}
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm text-gray-700 mt-1">Size ({order.size})</p>
            <p className="text-sm text-gray-700">Quantity: {order.quantity}</p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2">
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
        <div className="border-t border-amber-100 mt-4 pt-4 flex justify-between">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">${order.total}</span>
        </div>

        {/* Shipping to */}
        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="text-sm font-bold text-gray-900 mb-2">Shipping to</h4>
          <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
              <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="#6B7280" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.address}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="text-sm font-bold text-gray-900 mb-2">Delivery</h4>
          <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M2 4h8l4 3v5h-2a2 2 0 01-4 0H6a2 2 0 01-4 0H1V6l1-2zm3 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" fill="#6B7280" />
            </svg>
            <p className="text-sm text-gray-700">Est. delivery: {order.estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
