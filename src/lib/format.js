/** Display helpers. */
export const naira = (n) => '₦' + Number(n).toLocaleString('en-NG');

export const fmtDate = (iso) =>
  new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export const STATUS_COLORS = {
  Pending: '#92600a',
  Confirmed: '#1d4ed8',
  Shipped: '#0e7490',
  Delivered: '#15803d',
  Cancelled: '#b91c1c',
};
