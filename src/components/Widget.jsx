import React from "react";
import { Link } from "react-router-dom";

const Widget = ({ header, link, result }) => {
  return (
    <div className="widget">
      <Link to={link}>
        <h3>{header}</h3>
        <p>{result}</p>
      </Link>
    </div>
  );
};

export default Widget;
