/**
 * Kết hợp các class CSS thành một chuỗi, loại bỏ các giá trị falsy
 */
export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
