import axios from "axios";

//NYT
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "&apikey=6f9813872a14472ab89dd98413980828";

// The Economist
// const BASEURL = "https://newsapi.org/v2/everything?q=";
// const APIKEY = "&apiKey=67d4789abce04860812417025e343f7b$limit=10";

export default {
  // NYT
  search: function(topic, begin_date, end_date) {
    console.log("query: ", BASEURL + topic + '&begin_date='+ begin_date + '&end_date='+end_date + '&fl=web_url,headline,pub_date' + APIKEY);
    //console.log(axios.get(BASEURL + topic + '&begin_date='+ begin_date + '&end_date='+end_date + '&fl=web_url,headline,pub_date' + APIKEY));
    return axios.get(BASEURL + topic + '&begin_date='+ begin_date + '&end_date='+end_date + '&fl=web_url,headline,pub_date' + APIKEY);
  }, 
  // The Economist
  // search: function(topic, fromDate, toDate) {
  //   console.log("inside search");
  //   console.log("prameters", topic, fromDate, toDate);
  //   console.log(axios.get(BASEURL + topic + '&from='+ fromDate + '&to='+toDate + '&fl=web_url, headline, pub_date' + APIKEY));
  //   return axios.get(BASEURL + topic + '&from='+ fromDate + '&to='+toDate + '&fl=web_url, headline, pub_date' + APIKEY);
  // },
  saveThisArticle: function(articleData) {
    console.log("inside saveThisArticle: ", articleData);
    return axios.post("/api/articles/", articleData);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/", id);
  },
  getSavedArticles: function() {
    console.log("inside getSavedArticles");
    return axios.get("/api/articles/");
  }
};