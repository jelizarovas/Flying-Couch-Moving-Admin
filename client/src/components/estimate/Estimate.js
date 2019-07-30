import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ContactForm from "./ContactForm";
import LocationForm from "./LocationForm";
import AccessForm from "./AccessForm";
import DatesForm from "./DatesForm";
import InventoryForm from "./InventoryForm";
import PaymentForm from "./PaymentForm";

import Review from "./Review";

import useSignUpForm from "../CustomHooks";

import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeftOutlined";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRightOutlined";

const steps = ["Contact", "Location", "Access", "Dates", "Inventory", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ContactForm />;
    case 1:
      return <LocationForm />;
    case 2:
      return <AccessForm />;
    case 3:
      return <DatesForm />;
    case 4:
      return <InventoryForm />;
    case 5:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}
const Estimate = classes => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  //   const signup = () => {
  //     alert(`User Created!
  // Name: ${inputs.firstName} ${inputs.lastName}
  // Email: ${inputs.email}`);
  //   };

  //   const { inputs, handleInputChange, handleSubmit } = useSignUpForm(
  //     { firstName: "", lastName: "", email: "", password1: "", password2: "" },
  //     signup
  //   );

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" />

          {/* <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  This will be review TAB.
                </Typography>
                <Typography variant="subtitle1">
                  We will see map data, time and distance of the moves including
                  all stops with addreses. Estimated weight, dates available for
                  the move, contact information with hover edit button. submit
                  button and thank you message
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <MobileStepper
                  variant="dots"
                  steps={5}
                  position="static"
                  activeStep={activeStep}
                  className={classes.mobileStepper}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === 5}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                      {classes.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {classes.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Estimate;
