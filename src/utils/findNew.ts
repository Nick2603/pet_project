export const findNew = <T extends { username: string }>(
  incoming: T[],
  existing: T[],
): T[] => {
  const existingNames = new Set(existing.map((item) => item.username));

  return incoming.filter(
    (incomingItem) => !existingNames.has(incomingItem.username),
  );
};
