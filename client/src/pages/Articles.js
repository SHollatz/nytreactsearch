import React, { Component } from "react"
import Form from "../components/Form"

import Results from "./Results";
import Saved from "./Saved";
import API from "../utils/API";

class Search extends Component {
  state = {
    searchTopic: "",
    searchStart: "",
    searchEnd: "",
    results: [{
      id: 1,
      title: "Hamburg is nice!",
      url: "www.hamburg.de",
      date: "2018-01-17",
      time: "14:32:15"
    },
    {
      id: 2,
      title: "Berlin is artsy!",
      url: "www.berlin.de",
      date: "2000-01-17",
      time: "10:00:00"
    }],
    savedArticles: [{
      id: 3,
      title: "People from Leipzig speaks funny!",
      url: "www.leipzig.de",
      date: "1980-003-03",
      time: "9:55:55"
    },
    {
      id: 4,
      title: "Essen sucks!",
      url: "www.essen.de",
      date: "2005-05-05",
      time: "16:16:16"
    }
    ]
  };


  componentDidMount() {
    this.loadArticles();
  }

  searchNYT = (topic, start, end) => {
    API.search(topic, start, end)
      .then(res => {
        console.log("res.data.data", res.data.data);
        this.setState({ results: res.data.data })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchNYT(this.state.searchTopic, this.state.searchStart, this.state.searchEnd);
  };

  saveArticle = event => {
    API.saveThisArticle({
      id: this.state.id,
      title: this.state.title,
      url: this.state.url,
      date: this.state.date,
      time: this.state.time
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  loadArticles = () => {
    API.getSavedArticles()
      .then(res => this.setState({ savedArticles: res.data}))
      .catch(err => console.log(err));
  };

  removeArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err))
  };

  render() {
    return (
      <div id="search">
        <h3 className="title">Search</h3>
        <Form
          label="topic"
          labelName="Topic"
          search={this.state.searchTopic}
          searchName="searchTopic"
          handleInputChange={this.handleInputChange}
        />
        <Form
          label="beginDate"
          labelName="Start Year"
          search={this.state.searchStart}
          searchName="searchStart"
          handleInputChange={this.handleInputChange}
          placeholder="YYYYMMDD"
        />
        <Form
          label="endDate"
          labelName="End Year"
          search={this.state.searchEnd}
          searchName="searchEnd"
          handleInputChange={this.handleInputChange}
          placeholder="YYYYMMDD"
        />
        <button
          onClick={this.handleFormSubmit}
          className="btn btn-primary mt-3"
          id="btnSearch"
        >
          Search
        </button>
        <br></br><br></br><br></br>
        <h3 className="title">Results</h3>
        {this.state.results.map(result => (
          <Results
            id={result.id}
            key={result.id}
            title={result.title}
            url={result.url}
            date={result.date}
            time={result.time}
            save={this.saveArticle}
          />
        ))
        }
        <h3 className="title">Saved</h3>
        {this.state.savedArticles.map(saved => (
          <Saved
            id={saved.id}
            key={saved.id}
            title={saved.title}
            url={saved.url}
            date={saved.date}
            time={saved.time}
            remove={this.removeArticle}
          />
        ))
        }
      </div>
    );
  }
}

export default Search;