// Client-safe utilities — no server-only imports

export function formatPrice(precio: number, moneda: string): string {
  if (moneda === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(precio)
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('es-CO')} m²`
}
