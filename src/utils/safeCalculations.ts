export const safeRound = (value: number | null | undefined, fallback: number = 0): number => {
  return Math.round(value ?? fallback);
};

export const getSafeNumber = (value: number | null | undefined, defaultValue: number = 0): number => {
  return value ?? defaultValue;
};
