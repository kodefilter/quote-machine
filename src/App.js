import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//api end point for getting random quote
//change after useraccount renaming on my mac
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
      return <div>Loading ... </div>;
    } else {
      return (
        <div id="quote-box">
          <p id="text">{quote}</p>
          <p id="author">{author}</p>
          <button id="new-quote" onClick={this.getQuote.bind(this)}>
          New Quote
          </button>
          <a
            id="tweet-quote"
            rel="noopener noreferrer"
            target="_blank"
            class="twitter-share-button"
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
      );
    }
  }
}

export default App;
