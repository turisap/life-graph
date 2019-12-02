import React from "react";

const withPage: React.FC = ({ children }) => (
  <div className="container">
    <nav>nav</nav>
    <div className="page">{children}</div>
    <footer>footer</footer>
  </div>
);

export { withPage };
