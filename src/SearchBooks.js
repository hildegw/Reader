import React, {Component} from "react"
import {Link} from "react-router-dom"
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI"


class SearchBooks extends Component{
  //props to be renderd in App.js
  static propTypes = {
		onSearchBooks: PropTypes.func.isRequired,
	}

  state = {
    books: [],
    query: "",
  }

  //fetching books from database
  componentDidMount(){
    BooksAPI.getAll().then((booksFetched)=>
    {this.state.books = booksFetched
      console.log(this.state.books)
    })
  }

  //adding a book to shelf
  addBookToShelf = ()=>{
    //TODO get event and value for newBook from input field
    const newBook = ""
    if (this.props.onSearchBooks) this.props.onSearchBooks(newBook)
  }

  updateQuery = (target)=>{
  this.setState({query: target.trim()})
  }

  clearQuery = ()=>{this.setState({query: ""})}

  render(){
    //render books with query results
    let showBooks = []
    const {query, books} = this.state
		if(query){
			const match = new RegExp(escapeRegExp(query), "i");
			showBooks = books.filter(
        (book)=>{ if(match.test(book.title) || match.test(book.authors)) {return true;} }
      )
		}else{
			showBooks = books
		}
    console.log(showBooks)
	  showBooks.sort(sortBy("name"));

    return(
      <div className="search-books">
        <div className="search-books-bar">
        <Link to="/" className="close-search" innerRef={this.clearQuery}/>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
