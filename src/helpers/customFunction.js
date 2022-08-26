import eventBus from '@/eventBus';
import colors from '@/data/colors';
import categories from '@/data/categories';

export const gotoPage = (pageName, pageParams) => eventBus.$emit('gotoPage', pageName, pageParams);
export const getBgColorHEX = (id) => colors.find((el) => el.id === id).bgcolor;
export const getCategoryName = (id) => categories.find((el) => el.id === id).title;
