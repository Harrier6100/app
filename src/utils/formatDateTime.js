import moment from 'moment';

const format = (timestamp, formatStr) => {
    if (!timestamp) return '';
    // return moment.utc(timestamp).format(formatStr);
    return moment(timestamp).format(formatStr);
};

export const formatDate = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD');
};

export const formatTime = (timestamp) => {
    return format(timestamp, 'HH:mm:ss');
};

export const formatAt = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD HH:mm:ss');
};