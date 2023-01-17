import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import { AddItemContextProvider, EditItemContextProvider } from './context';
import { AxiosInterceptorProvider } from './services';
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
                    <BrowserRouter>
                        <AxiosInterceptorProvider>
                            <AddItemContextProvider>
                                <EditItemContextProvider>
                                    <App />
                                </EditItemContextProvider>
                            </AddItemContextProvider>
                        </AxiosInterceptorProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
