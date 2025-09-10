// Util Functions

/**
 * Check if a url is valid, for example:
 *
 * https://example.com [valid]
 * example.com [invalid]
 *
 * @param url - URL of the product
 * @returns {boolean}
 */
export const isURL = (url: string): boolean => {
  try {
    new URL(url);
  } catch (err) {
    return false;
  }

  return true;
};

/**
 * Checks if user requested for menu in text.
 *
 * @param {string} text
 * @returns {boolean}
 */
export const isMenuRequest = (text: string): boolean => {
  return text.toLowerCase() === "menu" ? true : false;
};
