import { useState , useEffect, useMemo} from "react";
import { MenuItem, OrderItem, Sale } from "../types";

export default function useOrder() {

  const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  };

  const initialOrder = getLocalStorageItem<OrderItem[]>('order', []);
  const initialDailySales = getLocalStorageItem<Sale[]>('sales', []);

  
  const [order, setOrder] = useState<OrderItem[]>(initialOrder);
  const [dailySales, setDailySales] = useState<Sale[]>(initialDailySales);

  useEffect( () => {
    localStorage.setItem('order', JSON.stringify(order)),
    localStorage.setItem('sales', JSON.stringify(dailySales))
  }, [order, dailySales ]);


  const addItem = (item: MenuItem) => {
    //console.log(item);
    const itemExist = order.find((orderItem) => orderItem.id === item.id);
    if (itemExist) {
      //console.log('Ya existe...');
      const updateOrderItem = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updateOrderItem);
    } else {
      const castNewItem: OrderItem = { ...item, quantity: 1 };
      setOrder([...order, castNewItem]);
    }
  };

  const removeItem = (id: MenuItem["id"]) => {
    const updateOrderItem = order.filter( orderItem => orderItem.id !== id );
    setOrder(updateOrderItem);
  };

  const decreaseItem = (id: MenuItem["id"]) => {
    const updateQuantityItem = order.map(orderItem => {
      if (orderItem.id === id) {
        const newQuantity = orderItem.quantity > 1 ? orderItem.quantity - 1 : 1;
        // Retorna el nuevo objeto con la cantidad actualizada
        return {
          ...orderItem,
          quantity: newQuantity
        };
      }
      // Retorna el item sin cambios si no coincide el id
      return orderItem;
    });
  
    // Actualiza el estado del pedido (order)
    setOrder(updateQuantityItem);
  };


  const increaseItem = (id: MenuItem["id"]) => {
    const updateQuantityItem = order.map(orderItem => {
      if (orderItem.id === id) {
        // Incrementa la cantidad del artículo
        return {
          ...orderItem,
          quantity: orderItem.quantity + 1
        };
      }
      // Retorna el item sin cambios si no coincide el id
      return orderItem;
    });
  
    // Actualiza el estado del pedido (order)
    setOrder(updateQuantityItem);
  };

  const total = useMemo( () => order.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0), [order]);


  const saveSale = () => {
    const newSale: Sale = {
      ...order[0], // Asumimos que el primer item es representativo, en este caso no se usará este campo
      items: [...order], // Añadimos los items
      total: total
    };
    setDailySales([...dailySales, newSale]);
    setOrder([]); // Reset the order after saving the sale
  };

  const dailyTotal =  useMemo( () => dailySales.reduce((sum, sale) => sum + sale.total, 0), [dailySales]);

  const clearSales = () => {
    setDailySales([])
  }
  
  
  return {
    addItem,
    order,
    removeItem,
    decreaseItem,
    total,
    dailySales,
    saveSale,
    dailyTotal,
    clearSales,
    increaseItem
  

  }
   
  
}
