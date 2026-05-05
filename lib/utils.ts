// Client-safe utilities — no server-only imports

export function formatPrice(precio: number, moneda: string): string {
  if (moneda === 'USD') {
    return `$ ${precio.toLocaleString('en-US')}`
  }
  return `$ ${precio.toLocaleString('es-CO')}`
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('es-CO')} m²`
}
