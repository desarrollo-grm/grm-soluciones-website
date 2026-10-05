import UnsubscribeSuccessPage from '@/src/page-sections/UnsubscribeSuccessPage';

export const metadata = {
  title: 'Desuscripción confirmada',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <UnsubscribeSuccessPage />;
}
