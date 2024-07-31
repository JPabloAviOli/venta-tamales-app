import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem
    addItem: (item: MenuItem) => void
   
}

export default function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    <>
    <button className="border-2 border-lime-100 w-full px-2 py-1 flex justify-between items-center
    hover:bg-lime-200 active:bg-lime-300 active:ring-2 active:ring-lime-400
    sm:active:bg-lime-400 sm:active:ring-lime-500"
    onClick={ () => addItem(item) }
    >
     <img className="h-20 w-20" 
     src={`${item.image}`} />     
     <p>{item.name}</p>
     <p>${item.price}</p>
    </button>
   </>
  )
}
