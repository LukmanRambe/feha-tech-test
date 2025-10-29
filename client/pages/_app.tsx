import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { NextPageWithLayout } from '@/ts/types/NextPageWithLayout';

import '@/styles/globals.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const get = Component.getLayout || ((page) => page);

  if (Component.getLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        {get(<Component {...pageProps} />)}
      </QueryClientProvider>
    );
  }

  return <Component {...pageProps} />;
};

export default App;
