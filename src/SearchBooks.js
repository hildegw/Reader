import React, {Component} from "react"
import {Link} from "react-router-dom"
import sortBy from "sort-by";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI"
import ShowBook from "./ShowBook"

class SearchBooks extends Component{
  //props to be renderd in App.js
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
		onSearchBooks: PropTypes.func.isRequired,
    onAddingToShelf: PropTypes.func.isRequired
	}

  //keeping track of books to display
  state = {
    books: [],
    query: "",   //only limited list of search parameters available
    maxResults: 25,
  }

  //handing selected books over to App.js to store in book shelf
  addBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
    this.setState(state => {
      return {
        books: state.books.map(myBook => {
          myBook.shelf = myBook.id === book.id ? target : myBook.shelf
          return myBook
        })
    }})}

  //getting books from query, keeping the query state up-to-date
  startQuery = (query)=>{
    this.setState({query: query})
    const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy',
    'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
    'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
    'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama',
    'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance',
    'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror',
    'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
    'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate',
    'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming',
    'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction',
    'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel',
    'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    const queryChecked = searchTerms.filter(searchTerm => query === searchTerm)
    if(queryChecked.length>0){
      BooksAPI.search(queryChecked[0], this.state.maxResults)
        .then((books)=>{
          if(books !== undefined){
            this.setState({books: books})
          }
        }
  )}}

  clearQuery = ()=>{this.setState({query: ""})}

  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const {query, books} = this.state

    //filtering the books that are already on the shelf
    let showBooks = []
    showBooks = books.map(book=>{
        let knownBook = this.props.myBooks.filter(myBook => myBook.id === book.id)
        if (knownBook.length>0) return book=knownBook[0]
        else return book
    })
    showBooks.sort(sortBy("title"))



    //displaying the list of books
    return(
      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search" innerRef={this.clearQuery}/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>this.startQuery(event.target.value)}
            />
          </div>
        </div>


        <div className="search-books-results">
          <ol className="books-grid">
           {showBooks.map((book)=>
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
)}}

export default SearchBooks
