import { QueryClient, QueryClientProvider } from 'react-query';

const defaultQueryConfig = { staleTime: 60000 };
const queryClient = new QueryClient({
  defaultOptions: {
    queries: defaultQueryConfig,
  },
});

export const QueryProvider = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
