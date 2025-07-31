import { api } from '@/libs/api';

export const fetchUsers = () => {
    return api.get(`/api/users`);
};

export const fetchUser = (code) => {
    return api.get(`/api/users/${code}`);
};

export const createUser = (payload) => {
    return api.post(`/api/users`, payload);
};

export const updateUser = (code, payload) => {
    return api.put(`/api/users/${code}`, payload);
};

export const removeUser = (code) => {
    return api.delete(`/api/users/${code}`);
};