import colors from '@/data/colors';
import categories from '@/data/categories';
import products from '@/data/products';

export const getProduct = (id) => products.find((el) => el.id === id);
export const getBgColorHEX = (id) => colors.find((el) => el.id === id).bgcolor;
export const getCategoryName = (id) => categories.find((el) => el.id === id).title;
export const numberFormat = (value) => new Intl.NumberFormat().format(value);
export function declinationProducts(val) {
  const words = ['товар', 'товара', 'товаров'];
  const value = Math.abs(val) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
}
export function scrollUp() {
  document.documentElement.scrollTop = 0;
}
