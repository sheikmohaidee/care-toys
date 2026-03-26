/// <reference types="vite/client" />
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://caretoys.in/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    // Required so PHP session cookie is sent with every request (admin auth)
    withCredentials: true,
});

// Attach bearer token for regular user routes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
    register:   (data: any) => api.post('/auth/register.php', data),
    login:      (data: any) => api.post('/auth/login.php', data),
    adminLogin: (data: any) => api.post('/admin/login.php', data),
    adminLogout:()          => api.post('/admin/logout.php'),
};

// ─── Products ────────────────────────────────────────────────────────────────
export const productsApi = {
    getAll:  ()                              => api.get('/products/index.php'),
    getById: (id: string)                    => api.get(`/products/index.php?id=${id}`),
    create:  (data: any)                     => api.post('/products/create.php', data, {
        headers: data instanceof FormData ? { 'Content-Type': undefined } : {}
    }),
    // Use POST for FormData compatibility (PHP doesn't parse $_FILES on PUT)
    update:  (id: string, data: any)         => api.post(`/products/update.php?id=${id}`, data, {
        headers: data instanceof FormData ? { 'Content-Type': undefined } : {}
    }),
    delete:  (id: string)                    => api.delete(`/products/delete.php?id=${id}`),
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const cartApi = {
    get:    ()                         => api.get('/cart/index.php'),
    add:    (data: any)                => api.post('/cart/add.php', data),
    update: (id: string, qty: number)  => api.put(`/cart/update.php?id=${id}`, { quantity: qty }),
    remove: (id: string)               => api.delete(`/cart/delete.php?id=${id}`),
};

// ─── Orders ──────────────────────────────────────────────────────────────────
export const ordersApi = {
    create:       (data: any)                     => api.post('/orders/create.php', data),
    getAll:       ()                              => api.get('/orders/all.php'),
    getUserOrders:()                              => api.get('/orders/index.php'),
    getById:      (id: string)                    => api.get(`/orders/detail.php?id=${id}`),
    updateStatus: (id: string, status: string)    => api.put(`/orders/status.php?id=${id}`, { status }),
};

// ─── Coupons ──────────────────────────────────────────────────────────────────
export const couponsApi = {
    getAll:  ()                      => api.get('/coupons/index.php'),
    create:  (data: any)             => api.post('/coupons/create.php', data),
    update:  (id: string, data: any) => api.put(`/coupons/update.php?id=${id}`, data),
    delete:  (id: string)            => api.delete(`/coupons/delete.php?id=${id}`),
};

// ─── Admin ───────────────────────────────────────────────────────────────────
export const adminApi = {
    getStats: () => api.get('/admin/stats.php'),
};

// ─── Settings ─────────────────────────────────────────────────────────────────
export const settingsApi = {
    get:    ()           => api.get('/settings/index.php'),
    update: (data: any)  => api.put('/settings/index.php', data),
};

export default api;
