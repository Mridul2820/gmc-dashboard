import { API_URL } from '@/constant';

export const createBrandApi = `${API_URL}/brands`;
export const getBrandsApi = (search: string, page: string, limit: string) =>
  `${API_URL}/brands?search=${search}&page=${page}&limit=${limit}`;

export const singleBrandApi = (id: string) => `${API_URL}/brands/${id}`;
