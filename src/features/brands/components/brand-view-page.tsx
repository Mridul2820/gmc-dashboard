import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './brand-form';
import axios from 'axios';
import { singleBrandApi } from '@/api/brandApis';

type TProductViewPageProps = {
  brandId: string;
};

export default async function ProductViewPage({
  brandId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Brand';

  if (brandId !== 'new') {
    const data = await axios.get(singleBrandApi(brandId));
    product = data.data as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Brand`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
