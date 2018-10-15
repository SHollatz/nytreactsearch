import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "&api_key=2fc79903c60c4e4bbf56ae6d335aa729&limit=10";

export default {
  search: function(topic, begin_date, end_date) {
    console.log(axios.get(BASEURL + topic + '&begin_date='+ begin_date + '&end_date='+end_date + '&fl=web_url, headline, pub_date' + APIKEY));
    return axios.get(BASEURL + topic + '&begin_date='+ begin_date + '&end_date='+end_date + '&fl=web_url, headline, pub_date' + APIKEY);
  },
  saveThisArticle: function(articleData) {
    return axios.post("/api/articles/", articleData);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/", id);
  },
  getSavedArticles: function(articleData) {
    return axios.post("/api/articles/", articleData);
  }
};