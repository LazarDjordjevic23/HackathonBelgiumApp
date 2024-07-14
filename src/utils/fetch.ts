export const _fetch = <type = any>(url: string, params?: RequestInit): Promise<type> =>
  fetch(url, params).then((res) => res.json());
