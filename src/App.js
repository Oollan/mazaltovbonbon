import React, { Component } from "react";
import "./App.css";
import MovingBubbles from "./movingbubbles";
import "./movingbubbles.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MovingBubbles />
        <h1>לבונבון המתוק שלי</h1>
        <h2>מאחל לך את כול הטוב שבעולם</h2>
        <h3>שתמיד תחייכי ותיהי מאושרת</h3>
        <h3>אוהב מפה ועד עין יהב, אילן</h3>
        <h4>❤❤❤❤❤❤❤</h4>
      </React.Fragment>
    );
  }
}

export default App;
