const sanitise = (val) => typeof val == 'number' && val > 0 && val <= 10;

export const validateInputs = (gridSizeVal, lineLengthVal) => {
  return (
    sanitise(gridSizeVal) &&
    sanitise(lineLengthVal) &&
    lineLengthVal >= 3 &&
    lineLengthVal <= gridSizeVal
  );
};
