import { Product } from "../Types/Product";
import { Tenant } from "../Types/Tenant";

const TEMPORARYoneProduct: Product = {

  id: 1,
  image: '/tmp/GoldenBurger.png',
  categoryName: 'Tradicional',
  name: 'Golden Burguer',
  price: 25.50,
  description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal,',

}

export const useApi = (tenantSlug: string) => ({

  getTenant: async () => {

    switch (tenantSlug) {
      case 'b7burguer':
        return {
          slug: 'b7burguer',
          name: 'B7Burguer',
          mainColor: '#0000FF',
          secondColor: '#09ACDB'
        }
        break;

      case 'fastdelivery':
        return {
          slug: 'fastdelivery',
          name: 'FastDelivery',
          mainColor: '#F4C430',
          secondColor: '#FFFF00'
        }
        break;

      case 'wrdelivery':
        return {
          slug: 'fastdelivery',
          name: 'WRDelivery',
          mainColor: '#FF0000',
          secondColor: '#00FF00'
        }
        break;

      default:
        return false;
    }

  },

  getAllProducts: async () => {
    let product = [];
    for (let q = 0; q < 10; q++) {
      product.push(TEMPORARYoneProduct);
    }
    return product;
  },

  getProduct: async (id: string) => {
    return TEMPORARYoneProduct;
  }



});