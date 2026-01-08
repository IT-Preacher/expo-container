import { device } from "./devices";

const scale = device.isTablet ? 1.2 : 1;

export const typography = {
  h1: 28 * scale,
  h2: 22 * scale,
  body: 16 * scale,
  caption: 13 * scale,
};
