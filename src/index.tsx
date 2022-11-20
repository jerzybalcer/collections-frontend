import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
