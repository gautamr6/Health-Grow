import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Login from "./components/login.component"
import Navbar from "./components/navbar.component"
import Dashboard from "./components/dashboard.component";
import EditWorkout from "./components/edit-workout.component";
import CreateWorkout from "./components/create-workout.component";
import CreateJournal from "./components/create-journal.component";
import SetChallenge from "./components/set-challenge.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import CreateAchievement from "./components/create-achievement.component";
import EditAchievement from "./components/edit-achievement.component";
import CreateGarden from "./components/create-garden.component";
import EditGarden from "./components/edit-garden.component";

function App() {
 return (
   <Router>
   <div className="container">
     <Navbar />
    <br/>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/edit/:id" component={EditWorkout} />
    <Route path="/create" component={CreateWorkout} />
    <Route path="/challenges" component={SetChallenge} />
    <Route path="/journal" component={CreateJournal} />
    <Route path="/user" component={CreateUser} />
    <Route path="/edit-user/:id" component={EditUser} />
    <Route path="/achievement" component={CreateAchievement} />
    <Route path="/edit-achievement/:id" component={EditAchievement} />
    <Route path="/garden" component={CreateGarden} />
    <Route path="/edit-garden/:id" component={EditGarden} />
   </div>
   </Router>
 );
}

export default App;
