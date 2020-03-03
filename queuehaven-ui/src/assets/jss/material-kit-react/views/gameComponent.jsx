import { container, title } from "assets/jss/material-kit-react.jsx";

const gameComponent = {
  boldButton: {
    color: "#000000",
    fontWeight: "bold",
    "&:hover": {
      color: "#000000"
    }
  },
  container: {
    marginBottom: "20px",
    marginTop: "20px",
    ...container
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  short: {
    maxHeight: "250px"
  },
  table: {
    margin: "5px",
    width: "80%"
  }
};

export default gameComponent;
