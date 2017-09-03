import React from 'react'
import {Route} from "react-router-dom"
import './App.css'
import SearchBooks from "./SearchBooks"
import BooksOnShelf from "./BooksOnShelf"


//feature ideas:
  //undo function when "move to none"
  //nicer layout for context menu
  //connect to Google books
  //show book info when clicking on book
  //connect to Amazon
  //editable maxResults
//TODO
  //context menu and routing


class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  addBookToShelf = (shelf, bookId) => {
    console.log("App " + shelf + bookId)
    let book = {shelf: shelf, id: bookId}
    console.log(book)
    this.setState(state=>({
      myBooks: state.myBooks.concat([book])
    }))
    console.log(this.state.myBooks)
  }

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
            }}
          />
        )}/>
      </div>
  )}}

export default BooksApp
