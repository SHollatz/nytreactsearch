import React, { Component } from "react";

class Form extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: "",
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // $.ajax({
    //   method: "GET",
    //   url: "/scrape"
    // }).then(function (response) {
    //   // console.log("response scrape", response);
    //   // for (var i = 0; i < response.length; i++) {
    //   //   $("#articles").append("<p data-id='" + response[i]._id + "'>" + response[i].title + "<br />" + response[i].link + "</p>");
    //   // }
    //   $.getJSON("/articles", function(data) {
    //     // For each one
    //       for (var i = 0; i < data.length; i++) {
    //         // Display the apropos information on the page
    //         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    //       }
    //     });
    // });
  }

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.topic}
            name="Topic"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Topic"
          />
          <input
            value={this.state.startYear}
            name="Start Year"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Start Year"
          />
          <input
            value={this.state.endYear}
            name="End Year"
            onChange={this.handleInputChange}
            type="password"
            placeholder="End Year"
          />
          <button onClick={this.handleFormSubmit}>Search</button>
        </form>
      </div>
    )
  }
}

export default Form;