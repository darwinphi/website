/**
 * UI Constants
 * Centralized magic numbers used throughout the application
 */

// Text Pressure Effect (TextPressure.jsx)
export const TEXT_PRESSURE = {
  MAX_DISTANCE: 200, // Distance threshold for mouse influence
  BASE_WEIGHT: 400, // Base font weight
  WEIGHT_RANGE: 200, // How much weight varies (200 to 400)
  WIDTH_RANGE: 25, // How much width varies
  SLANT_ANGLE: 15, // Maximum slant angle
};

// Image Zoom Effect (AboutPage.jsx)
export const IMAGE_ZOOM = {
  CIRCLE_RADIUS: 40, // Radius of the zoom circle
  ZOOM_BUFFER: 25, // Extra buffer for zoom effect to prevent edge overflow
  ZOOM_SCALE: 1.3, // Scale factor for zoomed area
};
