import React from 'react';
import './App.css';
import Navbar from './Components/Navbar.jsx';
import MastHead from './Components/Masthead.jsx';
import axios from 'axios';
import Recipes from './Components/Recipes'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "selectedFile": null,
      "currentFileName": null,
      "showSendButton": false,
      "imgUpload": null,
      "recipes": []
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  getRecipe = async (imgUpload) => {
    const response = await axios.post(`http://localhost:5000/image`, { image: imgUpload });
    this.setState({
      recipes: response.data
    })
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      currentFileName: event.target.files[0].name,
      showSendButton: true
    })
  }

  fileUploadHandler = () => {
    let reader = new FileReader()
    reader.readAsDataURL(this.state.selectedFile)
    reader.onload = async () => {
      const encodedImg = reader.result.replace("data:image/jpeg;base64,", "")
      this.setState({
        imgUpload: encodedImg
      });
      await this.getRecipe(this.state.imgUpload)
    }

    this.setState({
      showSendButton: false,
      currentFileName: ""
    })
  }

  render() {
    return (
      <span>
        <Navbar />
        <div>
        <MastHead
          showSendButton={this.state.showSendButton}
          uploadedFile={this.state.currentFileName}
          fileUploadHandler={this.fileUploadHandler}
          fileSelectedHandler={this.fileSelectedHandler}
          darkTitle={'WELCOME TO'}
          blueTitle={'SNAPMEAL'}
          description={'Don\'t know what to make for dinner? Well don\'t worry! Just take a picture of your fridge and Snapmeal will recommend a recipe based on what you have!'}
        />
        <Recipes 
          recipes={this.state.recipes}
        />
      </div>
      </span>
    )
  }
}

export default App;
