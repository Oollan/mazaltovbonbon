import React, { Component } from "react";
class MovingBubbles extends Component {
  state = {
    maxBubbles: 250,
    timer: -1,
    tick: 100,
    bubbles: [],
    hue: 188,
    hueRand: 20,
    saturation: 63,
    saturationRand: 10,
    light: 57,
    lightRand: 10,
    opacityFactor: 3,
    minOpacity: 0.1,
    ratio: 45000
  };

  instantiateBubbles() {
    let bubbles = [];

    const bubbleLength = Math.floor(
      (window.innerWidth * window.innerHeight) / this.state.ratio
    );

    for (let i = 0; i < bubbleLength; i++) {
      const bubbleId = "bubble" + i;
      const bubble = this.bubble(bubbleId);
      bubbles.push(this.createBubble(bubble));
    }
    return bubbles;
  }

  createBubble(e) {
    e.time = 0;
    e.x = Math.random() * window.innerWidth;
    e.y = Math.random() * window.innerHeight;
    e.xVel = Math.random() * 4 - 2;
    e.yVel = Math.random() * 4 - 2;
    e.diam = Math.floor(Math.random() * 160) + 40;
    e.width = e.diam + "px";
    e.height = e.diam + "px";
    const hue = Math.floor(Math.random() * this.state.hueRand) + this.state.hue;
    const saturation =
      Math.floor(Math.random() * this.state.saturationRand) +
      this.state.saturation;
    const light =
      Math.floor(Math.random() * this.state.lightRand) + this.state.light;
    const opacity = Math.min(
      Math.max(Math.random() / this.state.opacityFactor, this.state.minOpacity),
      1
    );
    const hsla =
      "hsla(" + hue + "," + saturation + "%," + light + "%," + opacity + ")";
    e.backgroundColor = hsla;
    e.boxShadow = "0 0 " + (Math.floor(Math.random() * 10) + 5) + "px " + hsla;
    e.opacity = "0";
    return e;
  }

  bubble(id) {
    return {
      x: 0,
      y: 0,
      xVel: 0,
      yVel: 0,
      time: 0,
      id,
      diam: 0
    };
  }

  updateBubbles = () => {
    this.setState({
      bubbles: this.state.bubbles.map(bub => {
        let bubble = JSON.parse(JSON.stringify(bub));
        if (
          bubble.x + bubble.diam < 0 ||
          bubble.x > window.innerWidth ||
          bubble.y + bubble.diam < 0 ||
          bubble.y - bubble.diam > window.innerHeight
        ) {
          bubble = this.createBubble(bubble);
        } else {
          if (bubble.time < 11) bubble.opacity = bubble.time / 10;
          bubble.x += bubble.xVel;
          bubble.y += bubble.yVel;
          bubble.left = Math.floor(bubble.x) + "px";
          bubble.top = Math.floor(bubble.y) + "px";
          bubble.time++;
        }
        return bubble;
      })
    });
  };

  renderBubbles = () => {
    return this.state.bubbles.map(bubble => {
      const id = bubble.id;

      return (
        <div
          id={id}
          key={id}
          style={{
            width: bubble.width,
            height: bubble.height,
            backgroundColor: bubble.backgroundColor,
            boxShadow: bubble.boxShadow,
            opacity: bubble.opacity,
            left: bubble.left,
            top: bubble.top
          }}
        />
      );
    });
  };

  componentDidMount() {
    this.setState({ bubbles: this.instantiateBubbles() });

    this.interval = setInterval(this.updateBubbles, this.state.tick);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div id="bubbleContainer">{this.renderBubbles()}</div>;
  }
}

export default MovingBubbles;
