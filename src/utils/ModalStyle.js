const ModalStyle = (width, height, padding) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    height: height,
    bgcolor: "background.paper",
    border: "2px solid #4f6d7a",
    // boxShadow: 24,
    p: padding,
    color: "black",
    backgroundColor: "white",
    borderRadius: "15px",
  };
  return style;
};

export default ModalStyle;
