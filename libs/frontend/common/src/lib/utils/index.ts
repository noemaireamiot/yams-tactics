export const cls = (...arr: (string | boolean | undefined)[]) =>
  arr.filter(Boolean).join(' ');
