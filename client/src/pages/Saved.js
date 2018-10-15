import React from "react"

const Saved = props => (
  <div>
    <p id={props.dataId}>Title: {props.title}
      <br></br>Link: {props.url}
      <button className="btnRemove" onClick={props.remove(props.id)}>Remove</button>
      <br></br>Published on {props.date} at {props.time}</p> 
  </div>
);

export default Saved;