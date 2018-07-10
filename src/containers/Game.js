import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Hero from "../components/Hero";
import GameCards from "../components/GameCards";

// Import UI components
import { Grid } from "semantic-ui-react";

import friendData from "../data/friendData";

class Game extends Component {
  state = {
    friendData: friendData,
    score: 0,
    topScore: 0
  }

  // when component mounts shuffle cards
  componentDidMount() {
    this.setState({
      friendData: this.shuffleFriends(this.state.friendData)
    })
  }
  
  // shuffle friend list and return new array
  shuffleFriends = friendData => {
    const shuffledFriendsList = friendData.sort(() => (0.5 - Math.random()));
    return shuffledFriendsList;
  }

  // when image is clicked, pass it's id through and check to see if it's been clicked before
  handleCardClick = id => {
    // set flag of correct guess status
    let guessedCorrectly = false;
    const newFriendList = this.state.friendData.map(friend => {

      // if id passed in is equal to friend[i].id
      if (friend.id === id) {
        // if that friend's clicked state is false, then let's make it a correct guess
        if (!friend.clicked) {
          friend.clicked = true;
          guessedCorrectly = true;
        } 
      }
      return friend;

    });

    // if guessedCorrectly was set to `true` then run handleCorrectGuess
    (guessedCorrectly) 
      ? 
    this.handleCorrectGuess(newFriendList) 
      : 
    this.handleIncorrectGuess(newFriendList)

  }

  handleCorrectGuess = newFriendList => {
    // destructure score and topScore out of state
    const {score, topScore} = this.state;

    // create a new score based on the current score + 1
    const newScore = score + 1;

    // if newScore is greater than the current topScore, newScore is the new topScore
    const newTopScore = (newScore > topScore) ? newScore : topScore;

    this.setState({
      friendData: this.shuffleFriends(newFriendList),
      topScore: newTopScore,
      score: newScore
    });
  }

  // reset game
  handleIncorrectGuess = newFriendList => {
    // reset all friends to have a `clicked` property of `false`
    const resetFriendList = newFriendList.map(friend => {
      friend.clicked = false;
      return friend;
    })

    this.setState({
      friendData: this.shuffleFriends(resetFriendList),
      score: 0
    });
  }

  render() {
    console.log(friendData);
    return (
      <Grid centered padded>
        <TopBar score={this.state.score} topScore={this.state.topScore}/>
        <Hero/>
        <GameCards score={this.state.score} friendData={this.state.friendData} handleCardClick={this.handleCardClick}/>
      </Grid>
    )
  }
}

export default Game;