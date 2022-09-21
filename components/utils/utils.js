export const getColorFromStyles = (styles, color) => {
  return color.includes("var(")
    ? styles.getPropertyValue(color.replace("var(", "").replace(")", ""))
    : color;
};
