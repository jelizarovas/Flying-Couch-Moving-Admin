const express = require("express");
const router = express.Router();
const Client = require("../../models/Client");
const Location = require("../../models/Location");
const Estimate = require("../../models/Estimate");
//get ESTIMATE SCHEMA
// const Estimate = require("../../models/Estimate");

//@route        POST api/estimates
//@description  Creates new estimate request
//@access       Public
router.post("/", async (req, res) => {
  const {
    nameFirst,
    nameMiddle,
    nameLast,
    nameSalutation,
    nameSuffix,
    email,
    phone,
    streetNumber,
    street,
    apartment,
    city,
    state,
    zip
  } = req.body;

  //VALIDATION MISSING NOW
  var clientID;
  // const text = req.body;
  try {
    let isClient = await Client.findOne({ email });
    if (!isClient) {
      const newClient = new Client({
        nameFirst,
        nameMiddle,
        nameLast,
        nameSalutation,
        nameSuffix,
        email, //@TODO: multiple email support
        phone //@TODO: multiple phone support
      });
      await newClient.save();
      clientID = newClient._id;
    } else {
      clientID = isClient._id;
    }
    //@TODO: multiple phone support

    //@TODO: create locations if !locations
    //@TODO: loop through all the stops
    // const newLocation = new Location({
    //   streetNumber,
    //   street,
    //   apartment,
    //   city,
    //   state,
    //   zip
    // });
    // const location = await newLocation.save();

    //@todo & get location id & role
    //@TODO:
    //@TODO:
    //@TODO:

    const newEstimate = new Estimate({
      client: clientID
    });
    await newEstimate.save();
    // res.json(estimate);
    console.log(req.body);
    res.json(clientID);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
