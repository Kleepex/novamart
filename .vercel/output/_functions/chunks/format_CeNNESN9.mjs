/** Display helpers. */
const naira = (n) => '₦' + Number(n).toLocaleString('en-NG');

const fmtDate = (iso) =>
  new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_COLORS = {
  Pending: '#92600a',
  Confirmed: '#1d4ed8',
  Shipped: '#0e7490',
  Delivered: '#15803d',
  Cancelled: '#b91c1c',
};

export { ORDER_STATUSES as O, STATUS_COLORS as S, fmtDate as f, naira as n };
