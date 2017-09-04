import React from 'react'
import {Route} from "react-router-dom"
import './App.css'
import SearchBooks from "./SearchBooks"
import BooksOnShelf from "./BooksOnShelf"
import * as BooksAPI from "./BooksAPI"


//feature ideas:
  //undo function when "move to none"
  //nicer layout for context menu
  //connect to Google books
  //show book info when clicking on book
  //connect to Amazon    let book = {shelf: shelf, id: bookId}

  //editable maxResults
//TODO
  //context menu and routing URLs


class BooksApp extends React.Component {
  state = {
    currentlyIds: [],
    } //just bookId and shelf info

  //saving the added book shelf data to server and to myBooks state
  addBookToShelf = (shelf, bookId) => {
    if(shelf === "currentlyReading"){
      this.setState(state=>({
        currentlyIds: state.currentlyIds.concat([bookId])
      }))
      console.log(this.state)
    }
    console.log("5 App addBookToShelf function updates BookAPI and sets State " + shelf + bookId)
    console.log(this.state.currentlyIds)
  }

/*  rendering either the book shelfs or the search list
 *  myBooks data is handed down to BooksOnShelf
 *  SearchBooks hands up books to add to shelf
 */

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BooksOnShelf
            myBooks={this.state.myBooks}
          />
        )}/>

        <Route path="/search" render={({history})=>(
          <SearchBooks
            onSearchBooks={()=>{
              history.push("/")
            }}
            onAddingToShelf={(shelf, bookId)=>{
              this.addBookToShelf(shelf, bookId)
              console.log("4 App from onAddingToShelf prop calling addBookToShelf with " + shelf + bookId)
            }}
          />
        )}/>
      </div>
  )}}

export default BooksApp
