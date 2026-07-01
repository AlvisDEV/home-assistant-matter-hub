import { describe, expect, it } from "vitest";
import { clampSetpointToLimits } from "./thermostat-server.js";

describe("clampSetpointToLimits", () => {
  it("should clamp an invalid zero heating setpoint to the minimum limit", () => {
    expect(clampSetpointToLimits(0, 1600, 3000)).toBe(1600);
  });

  it("should use a fallback setpoint when Home Assistant does not provide one", () => {
    expect(clampSetpointToLimits(undefined, 1600, 3000, 2100)).toBe(2100);
  });

  it("should clamp fallback setpoints to the configured limits", () => {
    expect(clampSetpointToLimits(undefined, 1600, 3000, 0)).toBe(1600);
    expect(clampSetpointToLimits(undefined, 1600, 3000, 3200)).toBe(3000);
  });
});
