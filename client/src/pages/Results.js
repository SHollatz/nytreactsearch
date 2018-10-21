import React from "react"

const Results = props => (
  <div>
    <p id={props.id}>Title: {props.title}
      <br></br>Link: {props.url}
      <button className="btnSave" onClick={event => props.save(event, props.title, props.url, props.date, props.time )}>Save</button>
      <br></br>Published on {props.date} at {props.time}</p>
  </div>
);

export default Results;

