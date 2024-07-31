export function formatCurrency( quantity: number){
    const formmater = new Intl.NumberFormat('en-US',{
        style: 'currency', currency: 'USD'
    })
    return formmater.format(quantity) 
}