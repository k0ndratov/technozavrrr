import colors from '@/data/colors';
import categories from '@/data/categories';
import products from '@/data/products';

export const getProduct = (id) => products.find((el) => el.id === id);
export const getBgColorHEX = (id) => colors.find((el) => el.id === id).bgcolor;
export const getCategoryName = (id) => categories.find((el) => el.id === id).title;
export const numberFormat = (value) => new Intl.NumberFormat().format(value);
