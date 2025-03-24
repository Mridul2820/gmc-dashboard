import { API_URL } from "@/constant";

export const createBrandApi = `${API_URL}/brands`;
export const getBrandsApi = (search: string, page: string) =>
  `${API_URL}/brands?search=${search}&page=${page}&limit=10`;
