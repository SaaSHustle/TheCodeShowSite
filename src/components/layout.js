import React from "react";
import "../styles/layout.css";
import { Link } from "gatsby";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();
const Layout = ({ children, currentSubject, subjects }) => {
  return (
    <div>
      <Navigation currentSubject={currentSubject} subjects={subjects} />
      {children}
    </div>
  );
};

const Navigation = ({ currentSubject, subjects }) => {
  return (
    <div className="NavigationBar">
      <Link to="/" className="brand">TheCodeShow</Link>
      {subjects.map(({title, postSlug}) => {
        return (
          <Link key={postSlug} to={`/${postSlug}`} className={`${
            title === currentSubject ? "NavItemSelected" : ""
          }`}>
            {title}
          </Link>
        );
      })}
    </div>
  );
};

export default Layout;
