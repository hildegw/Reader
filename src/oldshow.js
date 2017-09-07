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

  //setting the state with strings to be displayed
  settingState = (target) => {
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
    this.setState({bookShelf: shelfString})
  }

  //setting the shelf state for the book
  componentDidMount(){
    this.settingState(this.props.bookToShow.shelf)
  }

  //handing selected books over to App.js via SearchBooks to store in book shelf
  submitBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
    book.shelf = target
    this.settingState(target)
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
         </div>
         <div className="book-shelf-info">{this.state.bookShelf}</div>
         <div className="book-title">{book.title}</div>
         <div className="book-authors" >
          { book.authors ? book.authors.join(", ") : "" }
         </div>
       </div>
)}}

export default ShowBook
