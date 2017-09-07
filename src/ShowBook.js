import React, {Component} from "react"
import PropTypes from "prop-types";
import ContextMenu from "./ContextMenu"


class ShowBook extends Component{
  //props to be renderd in App.js
  static propTypes = {
		bookToShow: PropTypes.object.isRequired,
    onAddingToShelf: PropTypes.func.isRequired,
	}

  state = {
    bookShelf: ""
  }

  //storing the book shelf data from the Context Menu in bookShelf variable
  setBookShelf = (shelf)=>{
    this.setState({bookShelf: shelf})
  }

  //handing selected books over to App.js via SearchBooks to store in book shelf
  submitBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
  }

  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const book = this.props.bookToShow

    //displaying one book and menu
    return(
       <div className="book">
         <div className="book-top">
           <div className="book-cover"
            style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}
           />

           <ContextMenu
             bookToShow={book}
             onAddingToShelf={(target, bookSelected)=>{
               this.submitBookToShelf(target, bookSelected)
             }}
             onSelectingShelf={(shelf)=>{
               this.setBookShelf(shelf)
             }}
           />

         </div>
         <div className="book-shelf-info">{this.state.bookShelf}</div>
         <div className="book-title">{book.title}</div>
         <div className="book-authors" >
          { book.authors ? book.authors.join(", ") : "" }
         </div>
       </div>
)}}

export default ShowBook
