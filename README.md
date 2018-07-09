# Memory Game Project

## Table of Contents

* [Background](#background)
* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [How To Play](#howtoplay)

## Background

This is a Memory game, "Concentration" build using JavaScript, DOM Selectors and Event Listeners. The goal is to match all the cards in the least amount of moves and time. If the two cards opened by the user, do not match, then the game hides the cards. But if they do match, then the cards stay open. A user can only open two cards at a time.

When all the cards match, an alert message will be displayed showing the statistics (amount of time taken, number of moves taken, rating, to complete the game).

When all the cards are matched, the game will prompt the user asking if the user wants to play the game again.

Everytime the game is played, the cards are randomly shuffled using Fisher-Yates (aka Knuth) Shuffle algorithm so that a user cannot remember the location of the cards time ahead:

The algorithm can be found at:

https://github.com/coolaj86/knuth-shuffle


## Instructions
Click on any card to begin playing the game. The timer will start after the first card is clicked.
Count of stars decrease by 1 if number of moves taken are greater than 10 and less than 20.
Count of stars decrease by further 1 if number of moves taken are greater than 20.


## Dependencies

Framework: Bootstrap

Library: Font Awesome

Vanilla JS

## How to Play

Download the folder and extract it.

Open the index.html file to play the game.





