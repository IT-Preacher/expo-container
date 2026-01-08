import { device } from "./devices";

export const layout = {
  screenPadding: device.isTablet ? 32 : 16,
  maxContentWidth: device.isTablet ? 720 : "100%",
  borderRadius: device.isTablet ? 16 : 12,
};
