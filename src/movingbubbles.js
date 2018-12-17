import React, { Component } from "react";

class MovingBubbles extends Component {
  state = {
    maxBubbles: 250,
    timer: -1,
    tick: 100,
    bubbles: [],
    bubblesContainer: [],
    width: [],
    height: [],
    backgroundColor: [],
    boxShadow: [],
    opacity: [],
    left: [],
    top: [],
    hue: 188,
    hueRand: 20,
    saturation: 63,
    saturationRand: 10,
    light: 57,
    lightRand: 10,
    opacityFactor: 3,
    minOpacity: 0.1,
    ratio: 45000,
    instantiateBubbles() {
      const bubbles = [];
      const bubbleLength = Math.floor(
        (window.innerWidth * window.innerHeight) / this.ratio
      );
      for (let i = 0; i < bubbleLength; i++) {
        const bubbleElem = <div id={"bubble" + i} />;
        const bubble = this.bubble(bubbleElem);
        this.createBubble(bubble);
        bubbles.push(bubble);
      }
      return bubbles;
    },
    createBubble(e) {
      e.time = 0;
      e.x = Math.random() * window.innerWidth;
      e.y = Math.random() * window.innerHeight;
      e.xVel = Math.random() * 4 - 2;
      e.yVel = Math.random() * 4 - 2;
      e.diam = Math.floor(Math.random() * 160) + 40;
      const id = e.e.props.id;
      this.width[id] = e.diam + "px";
      this.height[id] = e.diam + "px";
      const hue = Math.floor(Math.random() * this.hueRand) + this.hue;
      const saturation =
        Math.floor(Math.random() * this.saturationRand) + this.saturation;
      const light = Math.floor(Math.random() * this.lightRand) + this.light;
      const opacity = Math.min(
        Math.max(Math.random() / this.opacityFactor, this.minOpacity),
        1
      );
      const hsla =
        "hsla(" + hue + "," + saturation + "%," + light + "%," + opacity + ")";
      this.backgroundColor[id] = hsla;
      this.boxShadow[id] =
        "0 0 " + (Math.floor(Math.random() * 10) + 5) + "px " + hsla;
      this.opacity[id] = "0";
    },
    bubble(e) {
      return {
        x: 0,
        y: 0,
        xVel: 0,
        yVel: 0,
        time: 0,
        e: e,
        diam: 0
      };
    }
  };

  constructor(props) {
    super(props);
    this.state.bubbles = this.state.instantiateBubbles();
  }

  render() {
    return <div id="bubbleContainer">{this.state.bubblesContainer}</div>;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const bubbles = this.state.bubbles.map(bubble => {
        const id = bubble.e.props.id;
        if (
          bubble.x + bubble.diam < 0 ||
          bubble.x > window.innerWidth ||
          bubble.y + bubble.diam < 0 ||
          bubble.y - bubble.diam > window.innerHeight
        ) {
          this.state.createBubble(bubble);
        } else {
          if (bubble.time < 11) this.state.opacity[id] = bubble.time / 10;
          bubble.x += bubble.xVel;
          bubble.y += bubble.yVel;
          this.state.left[id] = Math.floor(bubble.x) + "px";
          this.state.top[id] = Math.floor(bubble.y) + "px";
          bubble.time++;
        }
        if (this.state.bubblesContainer.length < this.state.bubbles.length) {
          return (
            <div
              id={id}
              key={id}
              style={{
                width: this.state.width[id],
                height: this.state.height[id],
                backgroundColor: this.state.backgroundColor[id],
                boxShadow: this.state.boxShadow[id],
                opacity: this.state.opacity[id],
                left: this.state.left[id],
                top: this.state.top[id]
              }}
            />
          );
        }
      });
      this.setState({ bubblesContainer: [bubbles] });
    }, this.state.tick);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default MovingBubbles;