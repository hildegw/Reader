import React, {Component} from "react"
import {Link} from "react-router-dom"
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";


class SearchBooks extends Component{
	state = {
	query: "",
  }

  updateQuery = (target)=>{
  this.setState({query: target.trim()})
  }

  clearQuery = ()=>{this.setState({query: ""})}

  render(){
    const {query} = this.state
    //const {books} = this.props  //TODO books have to come from DB
		let showBooks;
		if(query){
			const match = new RegExp(escapeRegExp(query), "i");
			//showBooks = books.filter((book)=>match.test(book.name)); //TODO check filter
		}else{
			//showingContacts = contacts;
		}

		//showBooks.sort(sortBy("name"));

    return(
      <div className="search-books">
        <div className="search-books-bar">
        <Link to="/" className="close-search"/>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
