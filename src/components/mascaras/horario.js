const horarioMask = (value) =>
  value
    .replace(/[^\dh:]/, '')
    .replace(/^[^0-2]/, '')
    .replace(/^([2-9])[4-9]/, '$1')
    .replace(/^\d[:h]/, ':')
    .replace(/^([01][0-9])[^:h]/, '$1')
    .replace(/^(2[0-3])[^:h]/, '$1')
    .replace(/^(\d{2}[:h])[^0-5]/, '$1')
    .replace(/^(\d{2}h)./, '$1')
    .replace(/^(\d{2}:[0-5])[^0-9]/, '$1')
    .replace(/^(\d{2}:\d[0-9])./, '$1');

export default horarioMask;
