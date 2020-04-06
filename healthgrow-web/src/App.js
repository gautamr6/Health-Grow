import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from "./components/navbar.component"
import Dashboard from "./components/dashboard.component";
import EditWorkout from "./components/edit-workout.component";
import CreateWorkout from "./components/create-workout.component";
import CreateAdmin from "./components/create-admin.component";
 
function App() {
 return (
   <Router>
   <div className="container">
     <Navbar />
    <br/>
    <Route path="/" exact component={Dashboard} />
    <Route path="/edit/:id" component={EditWorkout} />
    <Route path="/create" component={CreateWorkout} />
    <Route path="/admin" component={CreateAdmin} />
   </div>
   </Router>
 );
}
 
export default App;
