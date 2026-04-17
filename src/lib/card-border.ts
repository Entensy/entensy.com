import type { MouseEvent as ReactMouseEvent } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getNearestBorderProgress(x: number, y: number, width: number, height: number) {
  const clampedX = clamp(x, 0, width);
  const clampedY = clamp(y, 0, height);

  const topDistance = clampedY;
  const rightDistance = width - clampedX;
  const bottomDistance = height - clampedY;
  const leftDistance = clampedX;

  const perimeter = 2 * (width + height);
  const nearest = Math.min(topDistance, rightDistance, bottomDistance, leftDistance);

  // Travel clockwise: top -> right -> bottom -> left
  if (nearest === topDistance) {
    return clampedX / perimeter;
  }
  if (nearest === rightDistance) {
    return (width + clampedY) / perimeter;
  }
  if (nearest === bottomDistance) {
    return (width + height + (width - clampedX)) / perimeter;
  }
  return (2 * width + height + (height - clampedY)) / perimeter;
}

export function syncCardBorderSegment(event: ReactMouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const progress = getNearestBorderProgress(x, y, rect.width, rect.height);

  event.currentTarget.style.setProperty("--segment-progress", progress.toFixed(5));
  event.currentTarget.style.setProperty("--pointer-x", `${x}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${y}px`);
}
