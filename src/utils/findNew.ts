export const findNew = <T extends { name: string }>(
  incoming: T[],
  existing: T[],
): T[] => {
  const existingIds = new Set(existing.map((item) => item.name));

  return incoming.filter((incomingItem) => !existingIds.has(incomingItem.name));
};
