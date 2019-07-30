import React, { useState } from "react";
import { Paper } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";
import EventIcon from "@material-ui/icons/Event";
import CheckIcon from "@material-ui/icons/Check";
// import StarIcon from "@material-ui/icons/Star";
// import CancelIcon from "@material-ui/icons/Cancel";

import Fab from "@material-ui/core/Fab";
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const AvailableDates = params => {
  const isChipSelected = value => {
    return datesAvailable.find(date => date.text.short === value).selected;
  };

  const handleSelect = value => {
    const match = datesAvailable.find(date => date.text.short === value);
    toggleDateProperty(match, "selected");
  };

  const toggleDateProperty = (match, property) => {
    const tempDates = datesAvailable;
    if (match.key !== undefined) {
      if ([property] in match) {
        tempDates.find(date => date.key === match.key)[property] = !tempDates.find(date => date.key === match.key)[property];
        return setDatesAvailable(datesAvailable => [...tempDates]);
      }
    }
  };

  const [datesAvailable, setDatesAvailable] = useState([
    { key: 0, selected: false, date: new Date(), text: { short: "7/21", long: "07/21/2019", day: "Monday" }, hours: {}, disabled: true },
    { key: 1, selected: false, date: new Date(), text: { short: "7/22", long: "07/22/2019", day: "Monday" }, hours: {}, disabled: false },
    { key: 2, selected: false, date: new Date(), text: { short: "7/23", long: "07/23/2019", day: "Monday" }, hours: {}, disabled: false },
    { key: 3, selected: false, date: new Date(), text: { short: "7/24", long: "07/24/2019", day: "Monday" }, hours: {}, disabled: false },
    { key: 4, selected: false, date: new Date(), text: { short: "7/25", long: "07/25/2019", day: "Monday" }, hours: {}, disabled: false }
  ]);

  // const handleDelete = chipToDelete => {
  //   console.log(chipToDelete);

  //   setDatesAvailable(chips => chips.filter(chip => chip.key !== chipToDelete));
  // };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Dates
      </Typography>
      {datesAvailable.map(data => (
        <Chip
          // size="small"
          key={data.key}
          icon={<EventIcon />}
          onClick={() => handleSelect(data.text.short)}
          color={!isChipSelected(data.text.short) ? "default" : "primary"}
          label={data.text.short}
          onDelete={() => handleSelect(data.text.short)}
          deleteIcon={!isChipSelected(data.text.short) ? <div style={{ margin: "2px" }}> </div> : <CheckIcon />}
          variant={isChipSelected(data.text.short) ? "default" : "outlined"}
          style={{ margin: "0.2em" }}
        />
      ))}
      <div>Add date, Edit Dates, Adjust hours,</div>
    </div>
  );
};
const Movers = estimateData => {
  const increment = (target, type) => {
    //@TODO Function that increments & reduces mover & truck count
    //problem with the scope of estimateData needs to be passed in
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Movers & Trucks
      </Typography>
      <div>
        <Fab size="medium" color="primary" aria-label="Add" style={{ margin: "10px" }} onClick={() => increment(estimateData, "+")}>
          <AddIcon />
        </Fab>
        <Fab size="medium" color="default" variant="extended" style={{ margin: "10px" }}>
          <DirectionsRunIcon />
          {"    "}
          <Typography variant="h6" style={{ marginLeft: "10px" }}>
            {" "}
            4
          </Typography>
        </Fab>
        <Fab size="medium" color="secondary" aria-label="Remove" style={{ margin: "10px" }} onClick={() => increment(estimateData, "-")}>
          <RemoveIcon />
        </Fab>
      </div>
      <div>
        <Fab size="medium" color="primary" aria-label="Add" style={{ margin: "10px" }} onClick={() => increment(estimateData, "+")}>
          <AddIcon />
        </Fab>
        <Fab size="medium" color="default" variant="extended" style={{ margin: "10px" }}>
          <LocalShippingIcon />
          {"    "}
          <Typography variant="h6" style={{ marginLeft: "10px" }}>
            {" "}
            1
          </Typography>
        </Fab>
        <Fab size="medium" color="secondary" aria-label="Remove" style={{ margin: "10px" }} onClick={() => increment(estimateData, "-")}>
          <RemoveIcon />
        </Fab>
        <br /> Pounds And Selected Truck Capacity: 7,360 lbs / 6,000 lbs
      </div>
    </div>
  );
};
const TravelFee = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Travel Fee
      </Typography>
      <div>
        <Chip variant="outlined" label="Roundtrip" />
        <Chip variant="outlined" label="Fixed" style={{ marginLeft: "10px" }} />
        <Chip variant="outlined" label="No" style={{ marginLeft: "10px" }} />
        <br /> <br />
        Travel times: <br />
        <Chip size="small" variant="outlined" label="WO: 15 min" style={{ marginLeft: "4px" }} />
        <Chip size="small" variant="outlined" label="OSD: 15 min" style={{ marginLeft: "4px" }} />
        <Chip size="small" variant="outlined" label="DW: 15 min" style={{ marginLeft: "4px" }} />
        <br />
        <br />
        Calculated travel fee: <br />
        <Chip size="small" variant="outlined" label="- 15 min" style={{ marginLeft: "4px" }} />
        <Chip variant="outlined" label="30 min | $80" style={{ marginLeft: "4px" }} />
        <Chip size="small" variant="outlined" label="+ 15 min" style={{ marginLeft: "4px" }} />
      </div>
    </div>
  );
};
const CustomerSource = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Customer Source
      </Typography>
      <div>
        <Chip variant="outlined" label="New" />
        <Chip variant="outlined" label="Return" style={{ marginLeft: "10px" }} />
        <Chip variant="outlined" label="Referal" style={{ marginLeft: "10px" }} />
      </div>
    </div>
  );
};
const Inventory = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Inventory
      </Typography>
      <div>
        <div style={{ listStyleType: "none" }}>
          <div>
            Weight: <strong>7,000 lbs.</strong>
          </div>
          <div>
            Boxes: <strong>35</strong>
          </div>
          <div>
            Item Count: <strong>20</strong>
          </div>
          Beds: <strong>2</strong>
          <div>
            Unusual items: <br />
            <strong>
              <Chip size="small" variant="outlined" label="Piano [Baby Grand]" />
              <Chip size="small" variant="outlined" label="Hutch [All glass]" style={{ marginLeft: "4px" }} />
            </strong>
          </div>
          <strong>
            <Chip variant="outlined" label="Full Inventory List" style={{ marginTop: "10px" }} />
          </strong>
          <div />
        </div>
      </div>
    </div>
  );
};
const Materials = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Materials
      </Typography>
      <div>
        <div>
          Mattress Bags:
          <Chip size="small" variant="outlined" label="–" style={{ marginLeft: "4px" }} />
          <Chip variant="outlined" label="5" style={{ marginLeft: "4px" }} />
          <Chip size="small" variant="outlined" label="+" style={{ marginLeft: "4px" }} />
        </div>
        <div style={{ marginTop: "10px" }}>
          Medium Box (3cu):
          <Chip size="small" variant="outlined" label="–" style={{ marginLeft: "4px" }} />
          <Chip variant="outlined" label="2" style={{ marginLeft: "4px" }} />
          <Chip size="small" variant="outlined" label="+" style={{ marginLeft: "4px" }} />
        </div>
        <div>
          <strong>
            <Chip variant="outlined" label="Full Material List" style={{ marginTop: "10px" }} />
          </strong>
          <div />
        </div>
      </div>
    </div>
  );
};
const Access = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Access
      </Typography>
      Origin: 3 story house Ground floor, Stairs, Elevator Long walk, Narrow Door, Flights of Stairs, Parking: Street, Driveway, Alley, Loading Dock, Townhouse
      <br />
      Destination: 3 story house Ground floor, Stairs, Elevator Long walk, Narrow Door Flights of Stairs, Parking: Street, Driveway, Alley, Loading Dock
      <div />
    </div>
  );
};
const Time = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Time
      </Typography>
      Suggested time: 7-8 hours, checkmark Add / Remove => 15 min, 30 min, 1 hr, 2 hr
    </div>
  );
};
const Adjustments = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Adjustments
      </Typography>
      Credit Card Charge: 2.5% true, Cash Discount: 5% true, Yelp Discount: $(20) false
    </div>
  );
};
const Totals = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Totals
      </Typography>
      Total cost of the move
    </div>
  );
};
const GenerateEmail = params => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Generate Email
      </Typography>
    </div>
  );
};

const EstimateAdjust = () => {
  const inquiry = {
    _id: "",
    customer: [
      {
        fullName: "Judith Konrad",
        firstName: "Judith",
        lastName: "Konrad",
        salutation: "Ms.",
        middleName: "Natasha",
        suffix: "IV",
        email: ["aj@flyingcouchmoving.com"],
        phone: ["(206) 899-5321"],
        role: ["main"],
        source: "facebook"
      }
    ],
    locations: [
      {
        id: "xFAExdf",
        role: "origin"
      },
      {
        id: "sf34SDt",
        role: "destination"
      }
    ],
    dates: [],
    inventory: [
      // {id: sdfsdf, customString: "", customCU: "", customDimensions: "", customNote: ""}
    ],
    notes: "",
    discountCode: "",
    submitted: {
      assignedAgent: [],
      date: "",
      via: ""
    },
    calc: {
      travelTime: {},
      distance: {},
      totalWeight: {},
      mattressBags: {}
    }
  };

  // const [estimated, setEstimated] = useState({
  //   movers: [{ assigned: false }, { assigned: false }, { assigned: false }, { assigned: false }],
  //   trucks: [{ assigned: false }],
  //   selectedDates: [], //selected and set times,
  //   travelFee: {
  //     type: "fixed",
  //     cappedTime: "1 hour",
  //     customAmount: "",
  //     resetValue: ""
  //   },
  //   customerSource: "",
  //   inventory: [],
  //   materials: [],
  //   access: [],
  //   time: {
  //     minimum: 4,
  //     low: 5,
  //     high: 7
  //   },
  //   adjustment: {
  //     cash: {
  //       accepted: true,
  //       value: "-5%"
  //     },
  //     creditcard: {
  //       accepted: true,
  //       value: "+2.5%"
  //     },
  //     check: {
  //       accepted: true,
  //       value: "0"
  //     },
  //     customDiscount: {
  //       code: "",
  //       value: ""
  //     },
  //     email: {}
  //   }
  // });
  return (
    <Paper style={{ width: 640, margin: "auto", padding: "2em", marginTop: "2em", maxWidth: "95%" }}>
      <Typography variant="h6" color="primary" align="center" gutterBottom>
        Estimate Request
      </Typography>
      <Typography variant="subtitle1" align="center">
        <strong>{inquiry.customer.fullName}</strong> submitted
      </Typography>
      <AvailableDates />
      <Movers />
      <TravelFee />
      <CustomerSource />
      <Inventory />
      <Materials />
      <Access />
      <Time />
      <Adjustments />
      <Totals />
      <GenerateEmail />
    </Paper>
  );
};

export default EstimateAdjust;
