const selectfieldColourStyles = {
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  control: (styles) => ({
    ...styles,
    minHeight: 43,
    borderRadius: 20,
    border: "1px solid #E6E9F4",
    textAlign: "center",
  }),
};

export default selectfieldColourStyles;
