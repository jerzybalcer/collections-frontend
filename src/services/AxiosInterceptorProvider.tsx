import React from 'react';
import { showNotification } from '@mantine/notifications';
import { IconAlertTriangle } from '@tabler/icons';
import { apiClient } from './AxiosInstance';

interface AxiosInterceptorProviderProps {
    children: JSX.Element;
}

export const AxiosInterceptorProvider: React.FC<
    AxiosInterceptorProviderProps
> = ({ children }): JSX.Element => {
    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            showNotification({
                title: 'Error',
                message: error.response.data.error,
                color: 'red',
                icon: <IconAlertTriangle size={16} />,
                styles: () => ({
                    root: {
                        alignItems: 'start',
                        justifyContent: 'start',
                        textAlign: 'start',
                        overflow: 'hidden',
                    },

                    title: { overflow: 'hidden' },
                    description: { overflow: 'hidden' },
                    closeButton: { overflow: 'hidden' },
                }),
            });
            return Promise.reject(error);
        },
    );

    return children;
};
