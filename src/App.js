import React from 'react'
import {Route} from "react-router-dom"
import {Link} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from "./SearchBooks"
import BooksOnShelf from "./BooksOnShelf"


class BooksApp extends React.Component {
  state = {
    booksOnShelf: [],
    showSearchPage: true,
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BooksOnShelf
            booksOnShelf={this.state.booksOnShelf}
            onMoveBook={()=>{
              //TODO implement all the book-context menu items
            }}/>
        )}/>

        <Route path="/search" render={({history})=>(
          <SearchBooks
            onSearchBooks={()=>{
              history.push("/")
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
