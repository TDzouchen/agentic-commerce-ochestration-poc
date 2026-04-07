import { products } from '../../data/products'
import { user, order } from '../../data/user'

export default function PaymentSuccess() {
  const product = products.find((p) => p.id === order.productId)

  return (
    <div className="bg-white rounded-[12px] border border-gray-200 p-6 mb-4 w-4/5">
      {/* Success header */}
      <div className="flex items-center gap-3 mb-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path opacity="0.2" d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" fill="url(#paint0_linear_5799_4614)"/>
          <path d="M21.5 13L14.1625 20L10.5 16.5" stroke="url(#paint1_linear_5799_4614)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="url(#paint2_linear_5799_4614)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear_5799_4614" x1="7.2" y1="4" x2="28.4" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0FB0EA"/>
              <stop offset="1" stopColor="#F4FFDF"/>
            </linearGradient>
            <linearGradient id="paint1_linear_5799_4614" x1="10.8" y1="8.4" x2="30" y2="28.8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0FB0EA"/>
              <stop offset="1" stopColor="#F4FFDF"/>
            </linearGradient>
            <linearGradient id="paint2_linear_5799_4614" x1="-17.2" y1="-18.8" x2="51.2" y2="44.4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0FB0EA"/>
              <stop offset="1" stopColor="#F4FFDF"/>
            </linearGradient>
          </defs>
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">Payment success</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Your order has been received and is being processed
      </p>

      {/* Order summary card */}
      <div className="border border-gray-200 rounded-[12px] p-5">
        {/* Order header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Order summary</h3>
          <span className="text-sm text-gray-500">{order.id}</span>
        </div>

        {/* Product */}
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-[#F5F5F5] rounded-[8px] flex items-center justify-center flex-shrink-0">
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
            <p className="text-sm text-gray-700 mt-1">Size ({order.size}): {order.sizeValue}</p>
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
            <span className="text-sm flex items-center gap-1 text-[#D48806]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M10.0003 18.3334C9.66699 18.3334 9.34755 18.2709 9.04199 18.1459C8.73644 18.0209 8.4656 17.8404 8.22949 17.6042C7.82671 17.2015 7.47949 16.9376 7.18783 16.8126C6.89616 16.6876 6.45866 16.6251 5.87533 16.6251C5.18088 16.6251 4.5906 16.382 4.10449 15.8959C3.61838 15.4098 3.37533 14.8195 3.37533 14.1251C3.37533 13.5417 3.31283 13.1042 3.18783 12.8126C3.06283 12.5209 2.79894 12.1737 2.39616 11.7709C2.16005 11.5348 1.97949 11.264 1.85449 10.9584C1.72949 10.6529 1.66699 10.3334 1.66699 10.0001C1.66699 9.66675 1.72949 9.3473 1.85449 9.04175C1.97949 8.73619 2.16005 8.46536 2.39616 8.22925C2.79894 7.82647 3.06283 7.47925 3.18783 7.18758C3.31283 6.89591 3.37533 6.45841 3.37533 5.87508C3.37533 5.18064 3.61838 4.59036 4.10449 4.10425C4.5906 3.61814 5.18088 3.37508 5.87533 3.37508C6.45866 3.37508 6.89616 3.31258 7.18783 3.18758C7.47949 3.06258 7.82671 2.79869 8.22949 2.39591C8.4656 2.1598 8.73644 1.97925 9.04199 1.85425C9.34755 1.72925 9.66699 1.66675 10.0003 1.66675C10.3337 1.66675 10.6531 1.72925 10.9587 1.85425C11.2642 1.97925 11.535 2.1598 11.7712 2.39591C12.1739 2.79869 12.5212 3.06258 12.8128 3.18758C13.1045 3.31258 13.542 3.37508 14.1253 3.37508C14.8198 3.37508 15.41 3.61814 15.8962 4.10425C16.3823 4.59036 16.6253 5.18064 16.6253 5.87508C16.6253 6.45841 16.6878 6.89591 16.8128 7.18758C16.9378 7.47925 17.2017 7.82647 17.6045 8.22925C17.8406 8.46536 18.0212 8.73619 18.1462 9.04175C18.2712 9.3473 18.3337 9.66675 18.3337 10.0001C18.3337 10.3334 18.2712 10.6529 18.1462 10.9584C18.0212 11.264 17.8406 11.5348 17.6045 11.7709C17.2017 12.1737 16.9378 12.5209 16.8128 12.8126C16.6878 13.1042 16.6253 13.5417 16.6253 14.1251C16.6253 14.8195 16.3823 15.4098 15.8962 15.8959C15.41 16.382 14.8198 16.6251 14.1253 16.6251C13.542 16.6251 13.1045 16.6876 12.8128 16.8126C12.5212 16.9376 12.1739 17.2015 11.7712 17.6042C11.535 17.8404 11.2642 18.0209 10.9587 18.1459C10.6531 18.2709 10.3337 18.3334 10.0003 18.3334ZM12.0837 13.3334C12.4309 13.3334 12.726 13.2119 12.9691 12.9688C13.2121 12.7258 13.3337 12.4306 13.3337 12.0834C13.3337 11.7362 13.2121 11.4411 12.9691 11.198C12.726 10.9549 12.4309 10.8334 12.0837 10.8334C11.7364 10.8334 11.4413 10.9549 11.1982 11.198C10.9552 11.4411 10.8337 11.7362 10.8337 12.0834C10.8337 12.4306 10.9552 12.7258 11.1982 12.9688C11.4413 13.2119 11.7364 13.3334 12.0837 13.3334ZM7.87533 13.2917L13.292 7.87508L12.1253 6.70841L6.70866 12.1251L7.87533 13.2917ZM8.80241 8.80216C9.04546 8.55911 9.16699 8.26397 9.16699 7.91675C9.16699 7.56953 9.04546 7.27439 8.80241 7.03133C8.55935 6.78828 8.26421 6.66675 7.91699 6.66675C7.56977 6.66675 7.27463 6.78828 7.03158 7.03133C6.78852 7.27439 6.66699 7.56953 6.66699 7.91675C6.66699 8.26397 6.78852 8.55911 7.03158 8.80216C7.27463 9.04522 7.56977 9.16675 7.91699 9.16675C8.26421 9.16675 8.55935 9.04522 8.80241 8.80216Z" fill="#D48806"/>
              </svg>
              {user.memberTier} member {Math.round(user.discount * 100)}% discount
            </span>
            <span className="text-sm text-[#D48806]">-${Math.abs(order.memberDiscount)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-[#D48806] mt-4 pt-4 flex justify-between">
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M7.33333 12.9499V8.38325L3.33333 6.06659V10.6333L7.33333 12.9499ZM8.66667 12.9499L12.6667 10.6333V6.06659L8.66667 8.38325V12.9499ZM7.33333 14.4833L2.66667 11.7999C2.45556 11.6777 2.29167 11.5166 2.175 11.3166C2.05833 11.1166 2 10.8944 2 10.6499V5.34992C2 5.10547 2.05833 4.88325 2.175 4.68325C2.29167 4.48325 2.45556 4.32214 2.66667 4.19992L7.33333 1.51659C7.54444 1.39436 7.76667 1.33325 8 1.33325C8.23333 1.33325 8.45556 1.39436 8.66667 1.51659L13.3333 4.19992C13.5444 4.32214 13.7083 4.48325 13.825 4.68325C13.9417 4.88325 14 5.10547 14 5.34992V10.6499C14 10.8944 13.9417 11.1166 13.825 11.3166C13.7083 11.5166 13.5444 11.6777 13.3333 11.7999L8.66667 14.4833C8.45556 14.6055 8.23333 14.6666 8 14.6666C7.76667 14.6666 7.54444 14.6055 7.33333 14.4833ZM10.6667 5.68325L11.95 4.94992L8 2.66659L6.7 3.41659L10.6667 5.68325ZM8 7.23325L9.3 6.48325L5.35 4.19992L4.05 4.94992L8 7.23325Z" fill="#393939"/>
            </svg>
            <p className="text-sm text-gray-700">Est. delivery: {order.estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
