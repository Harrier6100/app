import moment from 'moment';

const format = (timestamp, formatStr = 'YYYY-MM-DD') => {
    if (!timestamp) return '';
    return moment.utc(timestamp).format(formatStr);
};

export const formatDate = (timestamp) =>
    format(timestamp, 'YYYY-MM-DD');

export const formatTime = (timestamp) =>
    format(timestamp, 'HH:mm:ss');

export const formatAt = (timestamp) =>
    format(timestamp, 'YYYY-MM-DD HH:mm:ss');