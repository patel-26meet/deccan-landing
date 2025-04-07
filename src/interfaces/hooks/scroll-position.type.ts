/**
 * Interface for scroll data returned by useScrollPosition hook
 */
export interface IScrollData {
  scrollY: number;
  scrollX: number;
  scrollDirection: "up" | "down" | "none";
  scrollPercentage: number;
}
