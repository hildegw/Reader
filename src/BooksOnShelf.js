import React, {Component} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import ShowBook from "./ShowBook"
import sortBy from "sort-by"


class BooksOnShelf extends Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onAddingToShelf: PropTypes.func.isRequired
	}

  //handing books selected over to App.js first to store in book shelf
  addBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
  }

  render(){
    const booksOnShelf = this.props.myBooks
    booksOnShelf.sort(sortBy("title"))

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title"></h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                 {booksOnShelf
                   .filter((book)=> book.shelf === "currentlyReading")
                   .map((book)=>
                   <li key={book.id}>
                     <ShowBook
                       bookToShow={book}
                       onAddingToShelf={(target, bookSelected)=>{
                         this.addBookToShelf(target, bookSelected)
                       }}
                     />
                   </li>
                 )}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title"></h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksOnShelf
                    .filter((book)=> book.shelf === "wantToRead")
                    .map((book)=>
                    <li key={book.id}>
                      <ShowBook
                        bookToShow={book}
                        onAddingToShelf={(target, bookSelected)=>{
                          this.addBookToShelf(target, bookSelected)
                        }}
                      />
                    </li>
                  )}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title"></h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksOnShelf
                    .filter((book)=> book.shelf === "read")
                    .map((book)=>
                    <li key={book.id}>
                      <ShowBook
                        bookToShow={book}
                        onAddingToShelf={(target, bookSelected)=>{
                          this.addBookToShelf(target, bookSelected)
                        }}
                      />
                    </li>
                  )}
                </ol>
              </div>
            </div>

          </div>
        </div>

        <div className="open-search">
          <Link to="/search"  >Add a book</Link>
        </div>
      </div>
)}}

export default BooksOnShelf
