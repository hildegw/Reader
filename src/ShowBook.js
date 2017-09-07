import React, {Component} from "react"
import PropTypes from "prop-types"
import ContextMenu from "./ContextMenu"


class ShowBook extends Component{

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
      case "currentlyReading": shelfString = "Currently Reading"
        break
      case "wantToRead": shelfString = "Want to Read"
        break
      case "read": shelfString = "Read"
        break
      case "none": shelfString = "None"
        break
      default: shelfString = ""
    }
    this.setState({bookShelf: shelfString})
  }

  //setting the shelf state for the book and handing it over to ShowBooks
  componentDidMount(){
    this.settingState(this.props.bookToShow.shelf)
  }

  //receiving book and shelf info to hand over to App and to set state
  submitBookToShelf = (target, book)=>{
    this.props.onAddingToShelf(target, book)
    this.settingState(this.props.bookToShow.shelf)
  }

  //rendering the filtered books with thumbnail, title, and authors
  render(){
    const book = this.props.bookToShow
    const bookShelf = this.state.bookShelf

    //displaying one book and menu
    return(
       <div className="book">
         <div className="book-top">
           <div className="book-cover"
            style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}
           />
           <ContextMenu
             bookToShow={book}
             onAddingToShelf={(target, book)=>{
               this.submitBookToShelf(target, book)
             }}
           />
         </div>
         <div className="book-shelf-info">{bookShelf}</div>
         <div className="book-title">{book.title}</div>
         <div className="book-authors" >
          { book.authors ? book.authors.join(", ") : "" }
         </div>
       </div>
)}}

export default ShowBook
