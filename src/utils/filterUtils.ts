import type { Tool } from '../types';

export function isUpdatedLast30Days(tool: Tool) {
  const updatedAt = new Date(tool.updated_at);
  const now = new Date();
  const daysAgo30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return updatedAt > daysAgo30;
}
