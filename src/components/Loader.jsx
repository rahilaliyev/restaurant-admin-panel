import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  let [loading] = useState(true);
  let [color] = useState("#266aeb");
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {" "}
      <ClipLoader color={color} loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

export default Loader;
