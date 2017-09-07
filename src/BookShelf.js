import React, {Component} from "react"
import PropTypes from "prop-types"
import ShowBook from "./ShowBook"
import sortBy from "sort-by"


class BookShelf extends Component {

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
    const bookShelfsShown = ["currentlyReading", "wantToRead", "read"]
    booksOnShelf.sort(sortBy("title"))

    return(
      <div>
        {bookShelfsShown.map((shelf)=>
          <div className="bookshelf" key={shelf}>
            <h2 className="bookshelf-title"></h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
               {booksOnShelf
                 .filter((book)=> book.shelf === shelf)
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
        )}
      </div>
  )
}}

export default BookShelf
