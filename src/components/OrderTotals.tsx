import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    saveSale: () => void
    total: number
    
}

export default function OrderTotals( { total, saveSale } : OrderTotalsProps) {
  return (
    <>
      <div className="space-y-3 flex justify-between items-center border-b-2">
        <div>
          <h2 className="font-black text-2xl">Total a pagar:</h2>
          <p>
            Total a pagar:
            <span className="font-bold text-xl"> {formatCurrency(total)}</span>
          </p>
        </div>
        <div>
          {total !== 0 && (
            <div>
              <button
                onClick={saveSale}
                className="bg-blue-600 text-white font-semibold p-2 hover:bg-blue-800 hover:ring-2 rounded-sm"
              >
                Guardar venta
              </button>
            </div>
          )}
        </div>
      </div>
    
    </>
  );
}
