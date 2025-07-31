import { api } from '@/libs/api';

export const fetchProduct = (code) => {
    return api.get(`/api/products/${code}`);
};