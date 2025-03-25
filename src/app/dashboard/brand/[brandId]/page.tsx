import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '@/features/brands/components/brand-view-page';

export const metadata = {
  title: 'Dashboard : Brand View'
};

type PageProps = { params: Promise<{ brandId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage brandId={params.brandId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
