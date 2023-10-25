import { Category } from "@/app/types/Category";
import { Order } from "@/app/types/Order";
import { OrderStatus } from "@/app/types/OrderStatus";
import { Product } from "@/app/types/Product";

const tmpProduct: Product = {
  id: 999,
  image: 'https://offloadmedia.feverup.com/saopaulosecreto.com/wp-content/uploads/2021/05/29044255/miha-rekar-ISVtBKNhJ2g-unsplash-1024x819.jpg',
  category: {
    id: 99,
    name: 'Burgers'
  },
  name: 'Burgão boladão',
  price: 35.3,
  description: 'Um burger boladão muito legal'
}

export const api = {
  login: async (email: string, password: string): Promise<{error: string, token?: string}> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if(email !== 'carlos@gmail.com') {
          resolve({
            error: 'E-mail e/ou senha não batem.'
          });
        } else {
          resolve({
            error: '',
            token: '123'
          });
        }
      }, 1000);
    });
  },
  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: ''});
      }, 1000);
    });
  },
  redefinePassword: async (password: string, token: string): Promise<{ error: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: ''});
      }, 1000);
    });
  },

  getOrders: async (): Promise<Order[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        
        const orders: Order[] = [];
        const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered']

        // TODO montar array de pedidos
        for(let i=0;i<6;i++ ) {
          orders.push({
            id: parseInt('12' + i),
            status: statuses[Math.floor(Math.random() * 3)],
            orderDate: '2023-01-03 18:30',
            userId: '1',
            userName: 'Pedro',
            shippingAddress: {
              id: 99,
              cep: '99999999',
              address: 'Rua bla bla',
              number: '1200',
              neighborhood: 'Algo',
              city: 'São Paulo',
              state: 'SP',
              complement: 'AAA2'
            },
            shippingPrice: 12,
            paymentType: 'card',
            changeValue: 0,
            cupom: "BLA",
            cupomDiscount: 2,
            products: [
              { qt: 2, product: tmpProduct },
              { qt: 3, product: {...tmpProduct, id: 888, name: 'Burger Vegetariano'} }
            ],
            subtotal: 99,
            total: 120 
          });
        }

        resolve(orders);
      }, 1000);
    });
  },

  changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
    return true;
  },

  getCategories: async (): Promise<Category[]> => {
    const list: Category[] = [
      { id: 99, name: 'Burgers' },
      { id: 99, name: 'Bebidas' },
      { id: 99, name: 'Doces' },
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list)
      }, 200);
    });
  },
  getProducts: async (): Promise<Product[]> => {
    const list: Product[] = [
      { ...tmpProduct, id: 123 },
      { ...tmpProduct, id: 124 },
      { ...tmpProduct, id: 125 },
      { ...tmpProduct, id: 126 },
      { ...tmpProduct, id: 127 },
      { ...tmpProduct, id: 128 },
      { ...tmpProduct, id: 129 },
      { ...tmpProduct, id: 130 },
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list)
      }, 500);
    });
  }
}