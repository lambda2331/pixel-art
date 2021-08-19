export type RGB = {
  r: number,
  g: number,
  b: number
}

export function hexToRgb(hex: string): RGB | null {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export async function postRequest<T> (url: string, props: RequestInit): Promise<T> {
  const json = await fetch(url, props)
  const result = await json.json()
  return result
}