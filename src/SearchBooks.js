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
  componentDidMount(){BooksAPI.getAll().then((books)=>this.setState({books}))}

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
        (book)=>{
          let isInFilter = false
          if(match.test(book.title) || match.test(book.authors)) {isInFilter = true;}
          return isInFilter
        }
      )
		}else{
			showBooks = books
		}
	  showBooks.sort(sortBy("name"));
    console.log(showBooks)

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
               <div className="book">
                 <div className="book-top">
                   <div className="book-cover"
                    style={{ width: 128, height: 193,
                      backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
                   </div>
                   <div className="book-shelf-changer">
                     <select>
                       <option value="none" disabled>Move to...</option>
                       <option value="currentlyReading">Currently Reading</option>
                       <option value="wantToRead">Want to Read</option>
                       <option value="read">Read</option>
                       <option value="none">None</option>
                     </select>
                   </div>
                 </div>
                 <div className="book-title">{book.title}</div>
                 { book.authors.map((author)=>
                   <div className="book-authors" key={author} >{author}</div>)}
               </div>
             </li>
           )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
