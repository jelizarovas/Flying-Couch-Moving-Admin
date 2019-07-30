import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import MaskedInput from "react-text-mask";

class AccessForm extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Location Access
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Elevator"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccessForm;
