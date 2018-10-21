import React, { Component } from "react"
import Form from "../components/Form"

import Results from "./Results";
import Saved from "./Saved";
import API from "../utils/API";
import Header from "../components/Header"
// import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";

class Search extends Component {
  state = {
    searchTopic: "",
    searchStart: "",
    searchEnd: "",
    query: "",
    results: [],
    savedArticles: []
  };

  // componentDidMount() {
  //    this.loadArticles();
  // }

  searchNYT = (topic, start, end) => {
    console.log("inside searchNYT");
    console.log("parameter: ", topic, start, end);
    API.search(topic, start, end)
      .then(res => {
        console.log("back in Articles");
        console.log("res.data.data", res.data.response.docs);
        const queryResults = res.data.response.docs;
        const results = queryResults.map(element => {
          const result = {}
          result.title = element["headline"]["main"];
          result.url = element["web_url"];
          const pub = element["pub_date"];
          result.date = pub.split("T")[0];
          const time = pub.split("T")[1];
          result.time = time.split("+")[0];
          //console.log("typeof url is ", typeof result.url);
          //console.log("typeof title is ", typeof result.title);
          //console.log("result", result);
          return result;
        });
        
        console.log("results: ", results);
        this.setState({ results: results })
      })
      .catch(err => console.log(err))
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
    console.log("handleFormSubmit");
    this.searchNYT(this.state.searchTopic, this.state.searchStart, this.state.searchEnd);
  };

  saveArticle = (event, title, url, date, time) => {
    event.preventDefault();
    console.log("inside saveArticle");
    console.log("typeof date is ", typeof date);
    console.log("typeof time is ", typeof time);
    API.saveThisArticle({
      title: title,
      url: url,
      date: date,
      time: time
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  loadArticles = () => {
    API.getSavedArticles(() => console.log("inside API call")
    )
      .then(res => {
        console.log("res", res);
        return (
          this.setState({ savedArticles: res.data }))
      }
      )
      .catch(err => console.log(err));
  };

  removeArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err))
  };

  render() {
    return (
      <div id="article">
        <Header
          linkSearch={this.query} />
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
            key={result.url}
            id={result.url}
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