import React, {Component} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import BookShelf from "./BookShelf"
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
            <BookShelf
              myBooks={this.props.myBooks}
              onAddingToShelf={this.addBookToShelf}
            />
          </div>
        </div>

        <div className="open-search">
          <Link to="/search"  >Add a book</Link>
        </div>
      </div>
)}}

export default BooksOnShelf
