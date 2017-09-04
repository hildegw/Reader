import React, {Component} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI"
import ShowBook from "./ShowBook"


class BooksOnShelf extends Component {

  //the book shelf data is made available as myBooks prop
  static propTypes = {
    myBooks: PropTypes.object.isRequired
	}

  //state for fetching the books for shelf from DB
  state = {
    currentlyBooks: [],
  }

  changeBookShelf = (shelf, id)=>{

  }

  //fetching the books in the shelf form DB via their ID
  //TODO other shelfs
  componentDidMount(){
      const books = this.props.myBooks
      if (books.currentlyReading !== undefined) {
        books.currentlyReading.map((id)=>{
          BooksAPI.get(id).then((book)=>{
            //console.log(book)
            this.setState(state=>({
              currentlyBooks: state.currentlyBooks.concat([book])
            }))
          })
        })
    }}


  /*/saving the added book shelf data to server and to myBooks state
  addBookToShelf = (shelf, bookId) => {
    BooksAPI.update(bookId, shelf).then((myBooks)=>this.setState({myBooks}))
    console.log("5 App addBookToShelf function updates BookAPI and sets State " + shelf + bookId)
    console.log(this.state.myBooks)
  }*/


  /* this is what the returned data looks like TODO
    {currentlyReading  :  (2) ["nggnmAEACAAJ", "sJf1vQAACAAJ"]
    read  :  (3) ["jAUODAAAQBAJ", "IOejDAAAQBAJ", "1wy49i-gQjIC"]
    wantToRead :  (2) ["evuwdDLfAyYC", "74XNzF_al3MC"]}
  */

  render(){
    //console.log(this.state.currentlyBooks)
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                 {this.state.currentlyBooks.map((book)=>
                   <li key={book.id}>

                     <ShowBook
                       bookToShow={book}
                       onAddingToShelf={(shelf, bookId)=>{
                         this.changeBookShelf(shelf, bookId)
                       }}
                     />

                   </li>
                 )}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
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
                      <div className="book-title">1776</div>
                      <div className="book-authors">David McCullough</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>


            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
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
                      <div className="book-title">The Hobbit</div>
                      <div className="book-authors">J.R.R. Tolkien</div>
                    </div>
                  </li>
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
