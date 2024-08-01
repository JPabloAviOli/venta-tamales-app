import { formatCurrency } from "../helpers";
import type { MenuItem, OrderItem } from "../types"

type OrderItemProps = {
    order: OrderItem[]
    removeItem: ( id: MenuItem['id']) => void
    decreaseItem: ( id: MenuItem["id"] ) => void
    increaseItem: ( id: MenuItem["id"] ) => void
    
}

export default function OrderItem( {order, removeItem, decreaseItem, increaseItem }: OrderItemProps) {


  return (
    <div>
      <h2 className="font-black text-4xl">Calcular venta</h2>

      <div className="space-y-3 mt-8">
        { order.map((item) => (
            <div className="flex justify-between items-center border-gray-200 py-5 border-t last-of-type:border-b" 
            key={item.id}>
              <div>
                <p className="text-lg">
                  {item.name} - {formatCurrency(item.price)}
                </p>
                <p className="font-black">Cantidad: {item.quantity}</p>
                <p className="font-black">Subtotal: {formatCurrency(item.quantity * item.price)} </p>
              </div>

              <div className="flex flex-col">

                <button 
                onClick={ () => removeItem(item.id)} 
                className="bg-red-600 h-8 w-8 rounded-full text-white font-black mb-2">
                  X
                </button>

                <div className="flex justify-center items-center">
                <button 
                 onClick={() => decreaseItem( item.id )}
                className="bg-red-600 h-8 w-8 rounded-full text-white font-black me-1">
                  -
                </button>
                <button 
                 onClick={() => increaseItem( item.id )}
                className="bg-lime-600 h-8 w-8 rounded-full text-white font-black">
                  +
                </button>
                </div>
               
              </div>
            </div>
          ))}
      </div>
    </div>
  )
  
}
