const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const ObjectId = require("mongoose").Types.ObjectId;

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route        GET api/profile/me
//@description  Get Current Users profile
//@access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route        POST api/profile
//@description  Create or update user profile
//@access       Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required")
      .not()
      .isEmpty(),
    check("skills", "Skills is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, useFindAndModify: false }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route        GET api/profile
//@description  Get all profiles
//@access       public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route        GET api/profile/user/:user_id
//@description  Get profile by user ID
//@access       public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route        DELETE api/profile
//@description  Delete profile user & posts
//@access       Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove(
      { user: req.user.id },
      { new: true, useFindAndModify: false },
      (err, response) => {
        if (err) throw err;
        return (isProfiledRemoved = response !== null ? true : false);
      }
    );
    await User.findOneAndRemove(
      { _id: req.user.id },
      { new: true, useFindAndModify: false },
      (err, response) => {
        if (err) throw err;
        return (isUserRemoved = response !== null ? true : false);
      }
    );

    res.json({
      profileDeleted: isProfiledRemoved,
      userDeleted: isUserRemoved
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  //@todo - remove users posts
});

//@route        PUT api/profile/experience
//@description  Add profile experience
//@access       Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From Date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route        DELETE api/profile/experience/:exp_id
//@description  Delete experience from profile
//@access       Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const toRemove = await Profile.findOne(
      { user: req.user.id },
      { experience: { $elemMatch: { _id: new ObjectId(req.params.exp_id) } } },
      (err, response) => {
        if (err) throw err;
        wasRemoved =
          !Array.isArray(response.experience) || !response.experience.length
            ? true
            : false;
      }
    );

    if (wasRemoved === true) {
      return res.status(400).json({ msg: "Experience not found" });
    }

    // This is the object that will be deleted
    // const objToDelete = toRemove.experience[0];

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          experience: { _id: new ObjectId(req.params.exp_id) }
        }
      },
      { new: true, useFindAndModify: false }
    );
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route        PUT api/profile/education
//@description  Add profile deucation
//@access       Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field Of Study is required")
        .not()
        .isEmpty(),
      check("from", "From Date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route        DELETE api/profile/education/:exp_id
//@description  Delete education from profile
//@access       Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const toRemove = await Profile.findOne(
      { user: req.user.id },
      { education: { $elemMatch: { _id: new ObjectId(req.params.edu_id) } } },
      (err, response) => {
        if (err) throw err;
        wasRemoved =
          !Array.isArray(response.education) || !response.education.length
            ? true
            : false;
      }
    );

    if (wasRemoved === true) {
      return res.status(400).json({ msg: "Education not found" });
    }

    // This is the object that will be deleted
    // const objToDelete = toRemove.education[0];

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          education: { _id: new ObjectId(req.params.edu_id) }
        }
      },
      { new: true, useFindAndModify: false }
    );
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
