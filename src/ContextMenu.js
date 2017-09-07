import React, {Component} from "react"
import PropTypes from "prop-types";


class ContextMenu extends Component{
  //props to be renderd in App.js
  static propTypes = {
		bookToShow: PropTypes.object.isRequired,
    onAddingToShelf: PropTypes.func.isRequired,
	}

  //handing selected books over to App.js to show in book shelfs
  submitBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
  }

  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const book = this.props.bookToShow

    //displaying the book's context menu
    return(
       <div className="book-shelf-changer">
         <select onClick={(event)=>
            this.submitBookToShelf(event.target.value, book)}>
           <option value="none" disabled>Move to...</option>
           {book.shelf === "currentlyReading" ?
           <option value="currentlyReading" > Currently Reading ✔</option> :
           <option value="currentlyReading" >Currently Reading</option> }
           {book.shelf === "wantToRead" ?
           <option value="wantToRead"  >Want to Read ✔ </option> :
           <option value="wantToRead"  >Want to Read</option> }
           {book.shelf === "read" ?
           <option value="read">Read ✔ </option> :
           <option value="read">Read</option> }
           {book.shelf === "none" ?
           <option value="none">None ✔ </option> :
           <option value="none">None</option> }
         </select>
       </div>
)}}

export default ContextMenu
