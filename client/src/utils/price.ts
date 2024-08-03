export const convertPrice=(price:number)=>{
 const number= new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(price/100);
 return number;
}

