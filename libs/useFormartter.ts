

export const userFormartter = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL'
    });
  },

  formatQuantity: (qt: number, minDigits: number) => {

    if (qt.toString().length >= minDigits) { return qt.toString(); }
    const remain = minDigits - qt.toString().length;
    return `${'0'.repeat(remain)}${qt}`;


  }
}) 