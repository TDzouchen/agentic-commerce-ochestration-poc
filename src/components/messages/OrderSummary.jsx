import { products } from '../../data/products'
import { user, order } from '../../data/user'

export default function OrderSummary() {
  const product = products.find((p) => p.id === order.productId)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4" style={{ maxWidth: '480px' }}>
      {/* Product info */}
      <div className="flex gap-4 mb-2">
        <div className="bg-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: '200px', height: '200px' }}>
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[85%] max-w-[85%] object-contain"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="%23f3f4f6" width="80" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10">Product</text></svg>'
            }}
          />
        </div>
        <div className="pt-1">
          <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{product.category}</p>
          <p className="text-sm text-gray-900 mt-3">Size ({order.size}): {order.quantity ? order.quantity : ''}</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-right mb-4">
        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        <span className="text-sm text-gray-500 ml-1">USD</span>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-bold text-gray-900">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">${order.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Estimated Tax</span>
          <span className="text-sm text-gray-500">${order.tax}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Estimated shipping</span>
          <span className="text-sm text-gray-500">{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm flex items-center gap-1.5" style={{ color: '#D48806' }}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M8.33333 16.6667C8 16.6667 7.68056 16.6042 7.375 16.4792C7.06944 16.3542 6.79861 16.1736 6.5625 15.9375C6.15972 15.5347 5.8125 15.2708 5.52083 15.1458C5.22917 15.0208 4.79167 14.9583 4.20833 14.9583C3.51389 14.9583 2.92361 14.7153 2.4375 14.2292C1.95139 13.7431 1.70833 13.1528 1.70833 12.4583C1.70833 11.875 1.64583 11.4375 1.52083 11.1458C1.39583 10.8542 1.13194 10.5069 0.729167 10.1042C0.493056 9.86806 0.3125 9.59722 0.1875 9.29167C0.0625 8.98611 0 8.66667 0 8.33333C0 8 0.0625 7.68056 0.1875 7.375C0.3125 7.06944 0.493056 6.79861 0.729167 6.5625C1.13194 6.15972 1.39583 5.8125 1.52083 5.52083C1.64583 5.22917 1.70833 4.79167 1.70833 4.20833C1.70833 3.51389 1.95139 2.92361 2.4375 2.4375C2.92361 1.95139 3.51389 1.70833 4.20833 1.70833C4.79167 1.70833 5.22917 1.64583 5.52083 1.52083C5.8125 1.39583 6.15972 1.13194 6.5625 0.729167C6.79861 0.493056 7.06944 0.3125 7.375 0.1875C7.68056 0.0625 8 0 8.33333 0C8.66667 0 8.98611 0.0625 9.29167 0.1875C9.59722 0.3125 9.86806 0.493056 10.1042 0.729167C10.5069 1.13194 10.8542 1.39583 11.1458 1.52083C11.4375 1.64583 11.875 1.70833 12.4583 1.70833C13.1528 1.70833 13.7431 1.95139 14.2292 2.4375C14.7153 2.92361 14.9583 3.51389 14.9583 4.20833C14.9583 4.79167 15.0208 5.22917 15.1458 5.52083C15.2708 5.8125 15.5347 6.15972 15.9375 6.5625C16.1736 6.79861 16.3542 7.06944 16.4792 7.375C16.6042 7.68056 16.6667 8 16.6667 8.33333C16.6667 8.66667 16.6042 8.98611 16.4792 9.29167C16.3542 9.59722 16.1736 9.86806 15.9375 10.1042C15.5347 10.5069 15.2708 10.8542 15.1458 11.1458C15.0208 11.4375 14.9583 11.875 14.9583 12.4583C14.9583 13.1528 14.7153 13.7431 14.2292 14.2292C13.7431 14.7153 13.1528 14.9583 12.4583 14.9583C11.875 14.9583 11.4375 15.0208 11.1458 15.1458C10.8542 15.2708 10.5069 15.5347 10.1042 15.9375C9.86806 16.1736 9.59722 16.3542 9.29167 16.4792C8.98611 16.6042 8.66667 16.6667 8.33333 16.6667ZM8.33333 15C8.44444 15 8.55208 14.9757 8.65625 14.9271C8.76042 14.8785 8.84722 14.8194 8.91667 14.75C9.48611 14.1806 10.0208 13.7951 10.5208 13.5938C11.0208 13.3924 11.6667 13.2917 12.4583 13.2917C12.6944 13.2917 12.8924 13.2118 13.0521 13.0521C13.2118 12.8924 13.2917 12.6944 13.2917 12.4583C13.2917 11.6528 13.3924 11.0035 13.5938 10.5104C13.7951 10.0174 14.1806 9.48611 14.75 8.91667C14.9167 8.75 15 8.55556 15 8.33333C15 8.11111 14.9167 7.91667 14.75 7.75C14.1806 7.18056 13.7951 6.64583 13.5938 6.14583C13.3924 5.64583 13.2917 5 13.2917 4.20833C13.2917 3.97222 13.2118 3.77431 13.0521 3.61458C12.8924 3.45486 12.6944 3.375 12.4583 3.375C11.6528 3.375 11.0035 3.27431 10.5104 3.07292C10.0174 2.87153 9.48611 2.48611 8.91667 1.91667C8.84722 1.84722 8.76042 1.78819 8.65625 1.73958C8.55208 1.69097 8.44444 1.66667 8.33333 1.66667C8.22222 1.66667 8.11458 1.69097 8.01042 1.73958C7.90625 1.78819 7.81944 1.84722 7.75 1.91667C7.18056 2.48611 6.64583 2.87153 6.14583 3.07292C5.64583 3.27431 5 3.375 4.20833 3.375C3.97222 3.375 3.77431 3.45486 3.61458 3.61458C3.45486 3.77431 3.375 3.97222 3.375 4.20833C3.375 5.01389 3.27431 5.66319 3.07292 6.15625C2.87153 6.64931 2.48611 7.18056 1.91667 7.75C1.75 7.91667 1.66667 8.11111 1.66667 8.33333C1.66667 8.55556 1.75 8.75 1.91667 8.91667C2.48611 9.48611 2.87153 10.0208 3.07292 10.5208C3.27431 11.0208 3.375 11.6667 3.375 12.4583C3.375 12.6944 3.45486 12.8924 3.61458 13.0521C3.77431 13.2118 3.97222 13.2917 4.20833 13.2917C5.01389 13.2917 5.66319 13.3924 6.15625 13.5938C6.64931 13.7951 7.18056 14.1806 7.75 14.75C7.81944 14.8194 7.90625 14.8785 8.01042 14.9271C8.11458 14.9757 8.22222 15 8.33333 15ZM10.4167 11.6667C10.7639 11.6667 11.059 11.5451 11.3021 11.3021C11.5451 11.059 11.6667 10.7639 11.6667 10.4167C11.6667 10.0694 11.5451 9.77431 11.3021 9.53125C11.059 9.28819 10.7639 9.16667 10.4167 9.16667C10.0694 9.16667 9.77431 9.28819 9.53125 9.53125C9.28819 9.77431 9.16667 10.0694 9.16667 10.4167C9.16667 10.7639 9.28819 11.059 9.53125 11.3021C9.77431 11.5451 10.0694 11.6667 10.4167 11.6667ZM6.20833 11.625L11.625 6.20833L10.4583 5.04167L5.04167 10.4583L6.20833 11.625ZM7.13542 7.13542C7.37847 6.89236 7.5 6.59722 7.5 6.25C7.5 5.90278 7.37847 5.60764 7.13542 5.36458C6.89236 5.12153 6.59722 5 6.25 5C5.90278 5 5.60764 5.12153 5.36458 5.36458C5.12153 5.60764 5 5.90278 5 6.25C5 6.59722 5.12153 6.89236 5.36458 7.13542C5.60764 7.37847 5.90278 7.5 6.25 7.5C6.59722 7.5 6.89236 7.37847 7.13542 7.13542Z" fill="#D48806"/>
            </svg>
            {user.memberTier} member {Math.round(user.discount * 100)}% discount
          </span>
          <span className="text-sm" style={{ color: '#D48806' }}>-${Math.abs(order.memberDiscount)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">${order.total}</span>
      </div>

      {/* Shipping to */}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Shipping to</h4>
        <div className="bg-[#F5F5F5] rounded-xl p-4">
          <p className="text-sm font-bold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-600 mt-1">{user.address}</p>
          <p className="text-sm text-gray-600 mt-0.5">{user.phone}</p>
        </div>
      </div>

      {/* Checkout button */}
      <button className="w-full mt-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors" style={{ height: '40px' }}>
        Checkout
      </button>
    </div>
  )
}
