export const exportCSV = (filename, headers, data) => {
    if (!Array.isArray(headers) || !Array.isArray(data) || data.length === 0) return;

    const csv = [headers, ...data]
    .map(row => row.map(cell => cell).join(','))
    .join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv; charset=utf8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};