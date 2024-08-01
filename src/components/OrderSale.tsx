import { formatCurrency } from "../helpers"
import type { Sale } from "../types"

type OrderSalesProps = {
    dailySales: Sale[]
    dailyTotal: number
    clearSales: () => void
    
}

export default function OrderSale({ dailySales, dailyTotal, clearSales} : OrderSalesProps) {

  return (
    <div className="space-y-3">
      <h2 className="font-black text-4xl">Historial de ventas:</h2>
      {dailySales.map((sale, index) => (
        <div key={index} className="border-b border-gray-300 py-2">
          <h3 className="font-bold">Venta {index + 1}:</h3>
          {sale.items.map((item, itemIndex) => (
            <p key={itemIndex}>
              {item.name} (x{item.quantity}):{" "}
              {formatCurrency(item.price * item.quantity)}
            </p>
          ))}
          <p className="font-bold">Total: {formatCurrency(sale.total)}</p>
        </div>
      ))}
      <p className="text-4xl font-semibold">
        Total del día:
        <span className="font-semibold text-4xl">
          {" "}
          {formatCurrency(dailyTotal)}
        </span>
      </p>

      {dailySales.length !== 0 && (
        <button
          onClick={() => clearSales()}
          className="bg-lime-600 text-white w-full font-semibold p-2 hover:bg-lime-800 hover:ring-2 rounded-sm"
        >
          Eliminar historial
        </button>
      )}
    </div>
  );
}
