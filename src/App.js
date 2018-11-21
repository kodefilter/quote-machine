import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//api end point for getting random quote
const endpoint = "https://talaikis.com/api/quotes/random/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quote: "",
      author: ""
    };
  }

  getQuote(params) {
    fetch(endpoint)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            quote: result.quote,
            author: result.author
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {
    this.getQuote();
   
  }

  render() {

    const { error, isLoaded, quote, author } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="jumbotron" id="quote-box">
          <p id="text">Loading ...</p>
        </div>);
    } else {
      return (
        <div className="jumbotron" id="quote-box">
          <p id="text">{quote}</p>
          <p id="author"> - {author}</p>

          <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-primary" id="new-quote" onClick={this.getQuote.bind(this)}>
          New Quote
          </button >
          <a
            id="tweet-quote"
            rel="noopener noreferrer"
            className="btn btn-primary"
            target="_blank"
            href={
              "https://twitter.com/intent/tweet?text=" + quote + " - " + author
            }
            data-size="large"
            data-text="custom share text"
            data-url="https://dev.twitter.com/web/tweet-button"
            data-hashtags="#freecodecamp,#project"
            data-related="twitterapi,twitter"
          >
            Tweet
          </a>
          </div>
        </div>
      );
    }
  }
}

export default App;
