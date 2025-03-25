'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/constants/data';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './brands-tables/columns';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getBrandsApi } from '@/api/brandApis';
import { gmcAuthToken } from '@/constant';
import { useSearchParams } from 'next/navigation';

type ProductListingPage = {};

export default function ProductListingPage({}: ProductListingPage) {
  const token = Cookies.get(gmcAuthToken);
  const searchParams = useSearchParams();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1;
  const search = searchParams.get('q') || '';
  const pageLimit = searchParams.get('limit') || 10;
  const [totalItems, setTotalItems] = useState(1);
  const [brands, setBrands] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        getBrandsApi(search || '', page.toString(), pageLimit.toString()),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBrands(res?.data?.data?.data);
      setTotalItems(res?.data?.data?.pagination?.total);
    } catch (error) {
      console.error('Error fetching brands', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [page, search]);

  return (
    <ProductTable columns={columns} data={brands} totalItems={totalItems} />
  );
}
