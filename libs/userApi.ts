import { Product } from "../Types/Product";
import { Tenant } from "../Types/Tenant";
import { User } from "../Types/User";

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
          mainColor: '#6AB70A ',
          secondColor: '#E0E0E0'
        }
        break;

      case 'fastdelivery':
        return {
          slug: 'fastdelivery',
          name: 'FastDelivery',
          mainColor: '#FB9400',
          secondColor: '#FFF9F2'
        }
        break;

      case 'wrdelivery':
        return {
          slug: 'wrdelivery',
          name: 'WRDelivery',
          mainColor: '#300030',
          secondColor: '#480048'
        }
        break;

      default:
        return false;
    }

  },

  getAllProducts: async () => {
    let product = [];
    for (let q = 0; q < 10; q++) {
      product.push({
        ...TEMPORARYoneProduct,
        id: q + 1
      });
    }
    return product;
  },

  getProduct: async (id: number) => {
    return {
      ...TEMPORARYoneProduct, id
    };
  },

  authorizeToken: async (token: string): Promise<User | false> => {
    if (!token) return false;
    return {
      name: 'Wdenberg',
      email: 'wdenberg42@gmail.com'
    }
  }

});