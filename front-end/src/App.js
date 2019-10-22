import React, {Component} from 'react';
import './App.css';

//this is the class component
class App extends Component {
//this is a state that stores the information that the user inputs
  state = {user: [], id: "", title: "", description: "", url: ""}

//this is a component that is mounted to the DOM
  componentDidMount = async () => {  //this is a async/await function with a arrow function that gets the data from the api
    const apiData = await fetch('http://localhost:8080/api') //this fetches the api from the backend
    const response = await apiData.json()

    try{      //the try statement allows the defining a block of code to be tested for errors when excuted
    	this.setState({  //the setState passes an object through
    		user: response
    	})
    }catch(err){         //the catch statement allow the defining a block of code to be executed, if an error occurs in the try block
    	console.log(err)
    }
  }

  whenSubmitted = () =>{  //this is an arrow function which is more efficent that the normal function
    var id = "id=" + this.state.id;  //this is defining all the items in the json file that the user wishes to add to the json file
    var title = "title=" + this.state.title;
    var description = "description=" + this.state.description;
    var url = "URL=" + this.state.url;
    fetch('http://localhost:8080/api?' + id + "&" + title + "&" + description + "&" + url, {    //this fetches the api from the backend and adds the information the user adds to the file
      method: "POST"
    })
    //this is a promise for handling asynchronous operations
      .then(() => {  
        fetch('http://localhost:8080/api', {
          method: "GET", 
          headers: {"Content-Type": "application/json"}
        })
          .then(res => res.json())
          .then(user => this.setState({ user }));
      });
//this setState is setting the user's input in the json file
    this.setState({
      id: "",
      title: "",
      description: "",
      url: ""
    });
  }
  //this is another arrow function that gets the user's information for the PUT method that updates the description or the title for the user from
  //an specific id that the user wants to change
  whenUpdated = () => {
    var id = "id=" + this.state.id;
    var title = "title=" + this.state.title;
    var description = "description=" + this.state.description
    fetch('http://localhost:8080/api?' + id + "&" + title + "&" + description, {
      method: "PUT"
    })
      .then(() => {
        fetch('http://localhost:8080/api', {method: "GET", headers: {"Content-Type": "application/json"}})
          .then(res => res.json())
          .then(user => this.setState({ user }));
      });
//this setState is setting the update for the description or title from the user
    this.setState({
      id: "",
      title: "",
      description: ""
    });
  }
  //this is for the delete method that lets the user delete the any id that the user inputs and all the information that the id contains
  whenRemoved = () => {
    var id = "id=" + this.state.id
    fetch('http://localhost:8080/api?' + id , {
      method: "DELETE"
    })
      .then(() => {
        fetch('http://localhost:8080/api', {method: "GET", headers: {"Content-Type": "application/json"}})
          .then(res => res.json())
          .then(user => this.setState({ user }));
      });
  }
//In the render and return from line 82 to line 103 is the information being written to the body of the the page
//then the id, title, description and URL has a onChange to let the element change to what ever the user has inputted
//thereafter the e.target value is the value property that the data of the user has entered in the input field

//then in lines 109 to 111 is the functions created above are called within the button so that the information can change in the body of the page

//then in line 118 to 122 is the parameter required and its properties that are to be retured from the whatever the user chooses to change from the POST, PUT and delete method
//So it just simply put gets the information from the user and anything that is in the json file
  render() {
    return (
      <div>
        <h1 className="header">Add Items, remove or update items from the list</h1>
        <div>
          <form className="form">
            <label>
              ID            
            <br /><input onChange={e => this.setState({id: e.target.value})} type="text" name="id" />
            </label>
            <br/>
            <label>
              TITLE
              <br /><input onChange={e => this.setState({title: e.target.value})} type="text" name="title" />
            </label>
            <br/>
            <label>
              DESCRIPTION
              <br /><input onChange={e => this.setState({description: e.target.value})} type="text" name="description" />
            </label>
            <br/>
            <label>
              URL
              <br /><input onChange={e => this.setState({url: e.target.value})} type="text" name="url" />
            </label>
            <br/>
            <button className="btn" onClick={() => this.whenSubmitted()} type="submit" value="Submit">POST</button>
            <button className="btn" onClick={() => this.whenUpdated()} type="submit" value="Change">PUT</button>
            <button className="btn" onClick={(e) => this.whenRemoved()} type="submit" value="Delete">Delete</button>
          </form>
        </div>
        <div className="list">
          {this.state.user.map( obj => 
              <div key={obj.id} className="display">
                  <hr/>
                  <p>ID: {obj.id}</p>
                  <p>Title: {obj.title}</p>
                  <p>Description: {obj.description}</p>
                  <p>URL: {obj.URL}</p>
              </div>
            )
          }
        </div>
      </div>
    )
  
}
}

export default App;


