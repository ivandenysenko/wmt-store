// discount settings
export const QUANTITY_FOR_DISCOUNT = 5;
export const DISCOUNT_FACTOR = 0.1;

// imgix image settings
const imageSettings = {
  auto: "format",
  fit: "crop",
  q: "80",
};
export const imageQuery = new URLSearchParams(imageSettings).toString();
