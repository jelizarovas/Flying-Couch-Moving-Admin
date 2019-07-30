import React from "react";
import Button from "@material-ui/core/Button";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">MovingApp</h1>
          <p className="lead">App to manage moving services</p>
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
          <Button variant="contained" color="secondary">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
