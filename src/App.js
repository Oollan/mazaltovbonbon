import React, { Component } from "react";
import "./App.css";
import MovingBubbles from "./movingbubbles";
import "./movingbubbles.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MovingBubbles />
        <p1>לבונבון המתוק שלי</p1>
        <p2>מאחל לך את כול הטוב שבעולם</p2>
        <p3>שתמיד תחייכי ותיהי מאושרת</p3>
        <p3>אוהב מפה ועד עין יהב, אילן</p3>
        <p4>❤❤❤❤❤❤❤</p4>
      </React.Fragment>
    );
  }
}

export default App;
