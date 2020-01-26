import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import memes from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.memes to the cards json array
  state = {
    memes,
    clickedMemeIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedMemeIds = this.state.clickedMemeIds;

    if(clickedMemeIds.includes(id)){
      this.setState({ clickedMemeIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedMemeIds.push(id)

      if(clickedMemeIds.length === 8){
        this.setState({score: 8, status: "You Won! Great Job, Smartie! Click to play again!", clickedMemeIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ memes, clickedMemeIds, score: clickedMemeIds.length, status: " " });

      for (let i = memes.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [memes[i], memes[j]] = [memes[j], memes[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ClIcKy gAmE</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.memes.map(meme => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={meme.id}
              key={meme.id}
              image={meme.image}
            />
          ))}
        </Wrapper>
        </div>
    );
  }
}

export default App;
