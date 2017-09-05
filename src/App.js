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


class BooksApp extends React.Component {
  state = {
    myBooks: [],
    }

  //fetching book shelf data from DB
  componentDidMount(){
    BooksAPI.getAll()
    .then((myBooks)=>this.setState({myBooks}))
  }

  //update database and myBooks state when books are added or shelf is changed
  addBookToShelf = (target, book)=> {
    book.shelf = target
    BooksAPI.update(book, target)
    let knownBook = this.state.myBooks.filter(myBook=> myBook.id === book.id)
    if(knownBook.length<1){
      this.setState(state => ({
        myBooks: state.myBooks.concat([book])
      }))
    } else {
      this.setState(state => {
            return {
              myBooks: state.myBooks.map(myBook => {
                myBook.shelf = myBook.id === book.id ? target : myBook.shelf
                return myBook
              })
          }})
      }
  }

/*  rendering either the book shelfs or the search list
 *  myBooks data is handed down to BooksOnShelf
 *  SearchBooks hands up books to add to shelf
 */
  render() {
    console.log(this.state.myBooks)

    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BooksOnShelf
            myBooks={this.state.myBooks}
            onAddingToShelf={(target, book)=>{
              this.addBookToShelf(target, book)
            }}
          />
        )}/>

        <Route path="/search" render={({history})=>(
          <SearchBooks
            onSearchBooks={()=>{
              history.push("/")
            }}
            onAddingToShelf={(target, book)=>{
              this.addBookToShelf(target, book)
            }}
          />
        )}/>
      </div>
  )}}

export default BooksApp
