import React, {Component} from "react"
import {Link} from "react-router-dom"
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI"
import ShowBook from "./ShowBook"

class SearchBooks extends Component{
  //props to be renderd in App.js
  static propTypes = {
		onSearchBooks: PropTypes.func.isRequired,
    onAddingToShelf: PropTypes.func.isRequired,
	}
  //TODO: list of books changes order when books are selected, first selected is not added

  //keeping track of books to display
  state = {
    books: [],
    query: "Art",  //only limited list of search parameters available
    maxResults: 25,    //TODO: does not seem to work
  }

  //fetching books from database
  componentDidMount(){BooksAPI.search(this.state.query, this.state.maxResults)
    .then((books)=>this.setState({books}))}
  //componentDidMount(){BooksAPI.getAll().then((books)=>this.setState({books}))}

  //handing selected books over to App.js to store in book shelf
  submitBookToShelf = (target, id)=>{
    this.props.onAddingToShelf(target, id)
  }

  //keeping the query state up-to-date
  updateQuery = (target)=>{
  this.setState({query: target.trim()})
  }
  clearQuery = ()=>{this.setState({query: ""})}

  //handing selected books over to App.js to store in book shelf
  addBookToShelf = (target, id)=>{
    this.props.onAddingToShelf(target, id)
  }


  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const {query, books} = this.state

    //filtering books to render with query results
    let showBooks = []
    if(query){
			const match = new RegExp(escapeRegExp(query), "i");
			showBooks = books.filter(
        (book)=>{
          let isInFilter = false
          if(match.test(book.title) || match.test(book.authors)) {isInFilter = true;}
          return isInFilter
      })
		} else { showBooks = books }
	  showBooks.sort(sortBy("name"))


    //displaying the list of books
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
          <ol className="books-grid">
           {showBooks.map((book)=>
             <li key={book.id}>

               <ShowBook
                 bookToShow={book}
                 onAddingToShelf={(shelf, bookId)=>{
                   this.addBookToShelf(shelf, bookId)
                 }}
               />

             </li>
           )}
          </ol>
        </div>
      </div>
)}}

export default SearchBooks
