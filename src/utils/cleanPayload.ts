export function cleanPayload<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(cleanPayload) as any;
  } else if (typeof data === "object" && data !== null) {
    const cleaned: any = {};
    for (const key in data) {
      const value = data[key];
      cleaned[key] =
        typeof value === "string" && value.trim() === ""
          ? null
          : cleanPayload(value);
    }
    return cleaned;
  }
  return data;
}
