const ModalStyle = (width, height, padding) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    height: height,
    bgcolor: "background.paper",
    p: padding,
    color: "black",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
  };
  return style;
};

export default ModalStyle;
