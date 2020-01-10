import React, { Component } from "react";
import "./DragDropApp.scss";
const GRID_ROWS = 3;
const GRID_COLS = 6;
class DragDropApp extends Component {
  constructor(props) {
    super(props);
    const movableComponentProps = [];
    for (let i = 0; i < 4; ++i) {
      const size = [(i%3)+1,1]; // [height, width]
      movableComponentProps.push({ 
        index: i, 
        draggable: true, 
        size: size,
        style: {
          gridRowStart:1,
          gridRowEnd:size[0],
          gridColumnStart:i+2
        }
      });
    }
    this.state = {
      movableComponentProps: movableComponentProps
    };
  }

  render() {
    console.log(this.state.movableComponentProps);
    const divArr = [];
    for (let i = 0; i < GRID_ROWS; ++i) {
      for (let j = 0; j < GRID_COLS; ++j) {
        divArr.push(
          <div
            index={i + 1 + "," + (j + 1)}
            onDrop={event => {
              console.log(event.target.getAttribute("index"));
              let gridDropCoordinates = event.target
                .getAttribute("index")
                .split(",");
              let droppedElementIndex = parseInt(
                event.dataTransfer.getData("element-index")
              );
              this.setState(state => {
                const style = {
                  gridRowStart: parseInt(gridDropCoordinates[0]),
                  gridColumnStart: parseInt(gridDropCoordinates[1])
                };
                state.movableComponentProps[droppedElementIndex].style = {
                  ...state.movableComponentProps[droppedElementIndex].style,
                  ...style
                }
                return state;
              });
            }}
            onDragOver={event => {
              event.preventDefault();
            }}
          ></div>
        );
      }
    }
    return (
      <div>
        <div className="drag-drop-app-base">{divArr}</div>
        <div className="drag-drop-app">
          {this.state.movableComponentProps.map(i => (
            <div
              {...i}
              onDragStart={event =>
                event.dataTransfer.setData("element-index", i.index)
              }
            >
              {i.index}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default DragDropApp;
