import React from "react"

const Results = props => (
  <div>
    
    <p id={props.dataId}>Title: {props.title}
      <br></br>Link: {props.url}
      <button className="btnSave" onClick={() => props.save(props.id)}>Save</button>
      <br></br>Published on {props.date} at {props.time}</p>
    
  </div>
);

export default Results;

