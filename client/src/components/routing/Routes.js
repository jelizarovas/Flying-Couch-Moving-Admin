import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";

// import Estimate from "../../components/estimate/Estimate";
import EstimateAdjust from "../estimateAdjust/EstimateAdjust";
import Estimate from "../../components/estimate/EstimateSimple";

// import ChipInput from "material-ui-chip-input";

const noComponent = () => {
  return <h1>Under Construction</h1>;
  // return <ChipInput />;
};

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        {/* Customer Routes */}
        {/* Home, About Us, Estimates, Services, Moving Tips, Contact Us */}
        <Route exact path="/about" component={noComponent} />
        <Route exact path="/services" component={noComponent} />
        <Route exact path="/tips" component={noComponent} />
        <Route exact path="/contact" component={noComponent} />

        {/* Moving Estimate Form */}
        <Route exact path="/estimate" render={classes => <Estimate {...classes} />} />
        <Route exact path="/estimate/:step" component={noComponent} />

        {/* Invitation only registration */}
        <Route exact path="/login" component={Login} />

        {/* User Token Views */}
        <Route exact path="/my/estimates" component={noComponent} />
        <Route exact path="/my/estimates/:id" component={noComponent} />
        <Route exact path="/my/contact" component={noComponent} />
        <Route exact path="/my/locations" component={noComponent} />
        <Route exact path="/my/inventory" component={noComponent} />
        <Route exact path="/my/invoice/:id" component={noComponent} />

        {/* Admin Routes */}
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/estimates" component={EstimateAdjust} />
        <PrivateRoute exact path="/admin/estimates/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/invoices" component={noComponent} />
        <PrivateRoute exact path="/admin/invoices/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/customer" component={noComponent} />
        <PrivateRoute exact path="/admin/customer/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/locations" component={noComponent} />
        <PrivateRoute exact path="/admin/locations/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/users" component={noComponent} />
        <PrivateRoute exact path="/admin/users/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/vehicles" component={noComponent} />
        <PrivateRoute exact path="/admin/vehicles/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/inventory" component={noComponent} />
        <PrivateRoute exact path="/admin/inventory/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/item" component={noComponent} />
        <PrivateRoute exact path="/admin/item/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/schedule" component={noComponent} />
        <PrivateRoute exact path="/admin/shedule/:id" component={noComponent} />
        <PrivateRoute exact path="/admin/company" component={noComponent} />
        <PrivateRoute exact path="/admin/company/insurance" component={noComponent} />
        <PrivateRoute exact path="/admin/company/documents" component={noComponent} />
        <PrivateRoute exact path="/admin/company/income" component={noComponent} />
        <PrivateRoute exact path="/admin/company/expenses" component={noComponent} />
        <PrivateRoute exact path="/admin/laws" component={noComponent} />
        <PrivateRoute exact path="/admin/log" component={noComponent} />
        <PrivateRoute exact path="/admin/pages" component={noComponent} />
        <PrivateRoute exact path="/admin/settings" component={noComponent} />

        {/* OLD ROUTES */}
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
