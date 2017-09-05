import React, {Component} from "react"
import PropTypes from "prop-types";


class ShowBook extends Component{
  //props to be renderd in App.js
  static propTypes = {
		bookToShow: PropTypes.object.isRequired,
    onAddingToShelf: PropTypes.func.isRequired,
	}
  //TODO: list of books changes order when books are selected, first selected is not added

  //handing selected books over to App.js via SearchBooks to store in book shelf
  submitBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
  }

  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const book = this.props.bookToShow

    //displaying one book plus menu
    return(
       <div className="book">

         <div className="book-top">
           <div className="book-cover"
            style={{ width: 128, height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
           </div>
           <div className="book-shelf-changer">
             <select onClick={(event)=>
                this.submitBookToShelf(event.target.value, book)}>
               <option value="none" disabled>Move to...</option>
               <option value="currentlyReading">Currently Reading</option>
               <option value="wantToRead">Want to Read</option>
               <option value="read">Read</option>
               <option value="none">None</option>
             </select>
           </div>
         </div>
         <div className="book-title">{book.title}</div>
         { book.authors !== undefined && (book.authors.map((author)=>
           <div className="book-authors" key={author} >{author}</div>))}
       </div>
)}}

export default ShowBook
