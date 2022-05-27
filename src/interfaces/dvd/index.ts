export interface IStock {
  id: string;
  quantity: number;
  price: number;
}

export interface IDvd {
  id: string;
  name: string;
  duration: string;
  stock: IStock;
}

export interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
}

export interface IDvdBuy {
  dvdId: string;
  quantity: number;
  userId: string;
}
