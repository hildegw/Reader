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
    myBooks: [],        //[shelf, book]
    }

  //saving the added book shelf data to server and to myBooks state
  addBookToShelf = (shelf, book) => {
      let bookToAdd = [shelf, book]
      this.setState(state=>({
        myBooks: state.myBooks.concat([bookToAdd])
      }))
    console.log(this.state)
    console.log("5 App addBookToShelf function updates BookAPI and sets State " + shelf + book)
    console.log(this.state.myBooks)
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
            onAddingToShelf={(shelf, book)=>{
              this.addBookToShelf(shelf, book)
              console.log("4b App from onAddingToShelf prop calling addBookToShelf with " + shelf + book)
            }}
          />
        )}/>

        <Route path="/search" render={({history})=>(
          <SearchBooks
            onSearchBooks={()=>{
              history.push("/")
            }}
            onAddingToShelf={(shelf, book)=>{
              this.addBookToShelf(shelf, book)
              console.log("4b App from onAddingToShelf prop calling addBookToShelf with " + shelf + book)
            }}
          />
        )}/>
      </div>
  )}}

export default BooksApp
