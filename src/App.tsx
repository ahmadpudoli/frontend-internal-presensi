// ** Router Import
import Router from './router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

const App = (props: any) => (
    <QueryClientProvider client={queryClient} contextSharing={true}>
        <Router />
        <ReactQueryDevtools />
    </QueryClientProvider>
);

export default App;
