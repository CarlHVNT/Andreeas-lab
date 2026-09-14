/** "AED 450" – used for prices everywhere so the format stays consistent */
export function formatPrice(amount: number, currency = "AED"): string {
  return `${currency} ${amount.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;
}

/** Remove a trailing slash so canonical URLs match the sitemap */
export function trimSlash(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}
