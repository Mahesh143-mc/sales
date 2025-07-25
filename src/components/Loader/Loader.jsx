import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
    const styles = {
        position: "absolute",
        top: "48%",
        left: "48%",
        zIndex: 9999,
    };
  return (
    <>
      <Spinner animation="border" role="status" style={styles} />
    </>
  );
}

export default Loader;
