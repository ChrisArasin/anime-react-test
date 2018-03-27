import React, { Component } from "react";
import anime from "animejs";

import "./App.css";

class App extends Component {
  onAnimComplete = () => {
    // This is dumb:
    // complete event only fires once unless you set completed back to false
    // then fired infinitely if you reversed back to start...
    // this.timeline.pause();
    // this.timeline.completed = false;
    // this.timeline.seek(0);
  };
  updateTimeline() {
    this.timeline = anime.timeline({
      direction: "normal",
      loop: false,
      autoplay: false,
      easing: "easeInOutQuad"
      // complete: this.onAnimComplete
    });

    this.timeline
      .add({
        targets: ".square.el",
        translateX: [0, 100],
        opacity: [0, 1],
        duration: 500,
        offset: 0
      })
      .add({
        targets: ".circle.el",
        translateX: [0, 100],
        opacity: [0, 100],
        duration: 500,
        offset: "-=100"
      })
      .add({
        targets: ".triangle.el",
        translateX: [0, 100],
        opacity: [0, 1],
        duration: 500,
        offset: "-=100"
      });
  }
  handleMouseDown = () => {
    if (!this.timeline || this.timeline.progress === 100) {
      this.updateTimeline();
    }
    console.log(this.timeline);
    if (this.timeline.reversed) {
      this.timeline.reverse();
    }
    this.timeline.play();
    window.addEventListener("mouseup", this.handleMouseUp);
  };
  handleMouseUp = () => {
    window.removeEventListener("mouseup", this.handleMouseUp);

    if (this.timeline.progress === 100) {
      return;
    }
    this.timeline.reverse();
  };
  render() {
    return (
      <div className="App">
        <div id="TLcontrols">
          <div className="line">
            <div className="square el" />
          </div>
          <div className="line">
            <div className="circle el" />
          </div>
          <div className="line">
            <div className="triangle el" />
          </div>
          <div className="line">
            <button onMouseDown={this.handleMouseDown}>Go</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
