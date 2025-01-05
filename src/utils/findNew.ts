export const findNew = <T extends { username: string }>(
  incoming: T[],
  existing: T[],
): T[] => {
  const existingIds = new Set(existing.map((item) => item.username));

  return incoming.filter(
    (incomingItem) => !existingIds.has(incomingItem.username),
  );
};
