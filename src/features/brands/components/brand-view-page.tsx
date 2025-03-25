import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './brand-form';

type TProductViewPageProps = {
  brandId: string;
};

export default async function ProductViewPage({
  brandId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Brand';

  if (brandId !== 'new') {
    const data = await fakeProducts.getProductById(Number(brandId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Brand`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
