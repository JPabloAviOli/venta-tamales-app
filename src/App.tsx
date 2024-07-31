import { menuItems } from "./data/data";
import MenuItem from "./components/MenuItem";
import useOrder from "./hooks/useOrder";
import OrderItem from "./components/OrderItem";
import OrderTotals from "./components/OrderTotals";
import OrderSale from "./components/OrderSale";


function App() {

  const { addItem, order, removeItem, decreaseItem, total, dailySales, saveSale, dailyTotal, clearSales, increaseItem } = useOrder();

  return (
    <>
      <header className="bg-lime-100 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora</h1>
      </header>
      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-3">
        <div className="p-5">

          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-8">
          {menuItems.map((item) => (
              <MenuItem 
              key={item.id} 
              item={item} 
              addItem={addItem}
              />  
            ))}
          </div>

        </div>
        <div className="border border-dashed border-lime-100 p-5 rounded-lg space-y-8">
          
          <OrderItem
          order={order}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          />
           <OrderTotals
           total={total}
           saveSale={saveSale}

          />
        </div>
        <div className="border md:ml-4 mt-5 md:mt-0 border-dashed border-lime-100 p-5 rounded-lg space-y-8">
          <OrderSale
            dailySales={dailySales}
            dailyTotal={dailyTotal}
            clearSales={clearSales}
          />
        </div>
      </main>
    </>
  );
}

export default App
