import React, {Component} from "react"
import PropTypes from "prop-types";


class ShowBook extends Component{
  //props to be renderd in App.js
  static propTypes = {
		bookToShow: PropTypes.object.isRequired,
    onAddingToShelf: PropTypes.func.isRequired,
	}

  state = {
    bookShelf: ""
  }

  //handing selected books over to App.js via SearchBooks to store in book shelf
  submitBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
    book.shelf = target
    let shelfString = ""
    switch (target) {
      case "currentlyReading": shelfString = "Currently Reading";
        break;
      case "wantToRead": shelfString = "Want to Read";
        break;
      case "read": shelfString = "Read";
        break;
      case "none": shelfString = "None";
        break;
      default: shelfString = "";
    }
    this.setState(()=>({bookShelf: shelfString}))
  }

  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const book = this.props.bookToShow
    console.log(this.state.bookShelf)
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
               <option value="currentlyReading" >Currently Reading</option>
               <option value="wantToRead"  >Want to Read</option>
               <option value="read">Read</option>
               <option value="none">None</option>
             </select>
           </div>
         </div>
         <div className="book-shelf-info">{this.state.bookShelf}</div>
         <div className="book-title">{book.title}</div>
         { book.authors !== undefined && (book.authors.map((author)=>
           <div className="book-authors" key={author} >{author}</div>))}
       </div>
)}}

export default ShowBook
