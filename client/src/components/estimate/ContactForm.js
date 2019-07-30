import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import MaskedInput from "react-text-mask";

class ContactForm extends Component {
  constructor() {
    super();
    this._handleKeyPress = this._handleKeyPress.bind(this);
    // this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  // Loop through the ref's object, and bind each of them to onkeypress
  componentDidMount() {
    for (let x in this.refs) {
      this.refs[x].onkeypress = e => this._handleKeyPress(e, this.refs[x]);
    }
  }

  // This checks ENTER key (13), then checks if next node is an INPUT
  // Then focuses next input box
  _handleKeyPress(e, field) {
    if (e.keyCode === 13) {
      e.preventDefault(); // Prevent form submission if button present
      // let next = this.refs[field.name];
      console.log(e.target.value);

      // if (next && next.tagName === "INPUT") {
      //   this.refs[field.name].nextSibling.focus();
      // }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Personal Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="fullName"
              name="fullName"
              label="Full Name"
              fullWidth
              autoComplete="fname"
              variant="outlined"
              ref="fullName"
              // onChange={handleInputChange}
              // value={inputs.firstName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              autoComplete="phone"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined">+ Add Another Contact</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ContactForm;
