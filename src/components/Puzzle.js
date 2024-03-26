import React, { forwardRef, useState } from "react";
import "../styles/puzzle.css";
import { ReactSortable } from "react-sortablejs";

class Puzzle extends React.Component {
  constructor(props) {
    super(props)

  }
  render = () => <BasicFunction level={this.props.level} page={this.props.page} indices={this.props.indices} onIndicesChange={this.props.onIndicesChange} />;

}

const CustomComponent = forwardRef((props, ref) => {
  console.log("props - ", props);

  return (
    <div
      style={{
        direction: "rtl",
        gridTemplateColumns: "repeat(" + props.id + ",  auto)",
        display: "grid",
        justifyContent: "center"
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
});


export const BasicFunction = (props) => {

  const level = props.level
  const currentPage = props.page
  const myindices = props.indices

  function computeIndex(index) {

    // Function to make grid position equal to index in array
    // In a 5-column level, grid 5 becomes 0, 4 -> 1, 3 -> 2, 2 -> 3, 1 -> 4 

    let reverse = ((Math.floor(index / level) * level) + (level - (index % level)));
    return reverse;
  }

  function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215.
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
  }


  return (
    <div>

      <ReactSortable
        id={level}
        expand={true}
        tag={CustomComponent}
        list={props.indices}
        setList={props.onIndicesChange}
      >
        {
          myindices.map((item, i) => (

            //Exclude Negative indices which were only placeholders to avoid error with right-to-left arrangement
            item.randomId < 0 ?
              <p width="0" height="0"></p> :
              <img
                draggable="true"
                id={i - level}
                key={computeIndex(item.randomId)}

                // src url formation from level and page number
                // reverseIndex helps to convert from left index to right index

                // old aws link for images
                //src = {"https://hifzmaster.s3.us-east-2.amazonaws.com/"+level+"_15/page"+("00" + currentPage).slice(-3) + "_" + ("00"+(computeIndex(item.randomId))).slice(-3) +".png"}
                src={"https://s3.tebi.io/chunks/" + level + "/page" + ("00" + currentPage).slice(-3) + "_" + ("00" + (computeIndex(item.randomId))).slice(-3) + ".png"}

                // when grid position is correct, make background pure white, else random color
                style={item.randomId !== i - level ? { backgroundColor: generateRandomColor() } : { backgroundColor: "#fff" }}

              >
              </img>

          ))

        }
      </ReactSortable>

    </div>
  );
};
export default Puzzle