import React from "react";
import "./Form.css";

const Form = props => (
  <form>
    <div className="form-group">
      <label htmlFor={props.label}>{props.labelName}</label>
      <input
        onChange={props.handleInputChange}
        value={props.search}
        name={props.searchName}
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        id={props.id}
      />
    </div>
  </form>
)


export default Form;