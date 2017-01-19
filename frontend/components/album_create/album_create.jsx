import React from 'react';
import { hashHistory } from 'react-router';

class AlbumCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      imageFile: null,
      description: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ imageFile: file });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("album[title]", this.state.title);
    formData.append("album[description]", this.state.description);
    formData.append("album[image]", this.state.imageFile);

    this.props.createAlbum(formData)
      .then((res) => {
        hashHistory.push(`/artists/${this.props.currentUser.id}`);
      });
  }

  render () {

    return (
      <div className='album-form-container'>
        <section className='album-form-info'>


          <form className='album-form' onSubmit={this.handleSubmit}>
            <h2 className='album-form-headers'>Create Album</h2>

            <label>Title:
              <input
                className='album-title'
                type="text"
                value={this.state.title}
                onChange={this.update('title')} />
            </label>

            <label className='album-art-upload'>Album Art:
              <input type='file' onChange={this.updateFile} />
            </label>

            <img src={this.state.imageUrl} />

            <label>Description:
              <textarea
                className='album-description'
                type='text'
                value={this.state.description}
                onChange={this.update('description')} />
            </label>

            <input className='album-submit-button' type='submit' value='Create Album' />
          </form>
        </section>
      </div>
    );
  }
}

export default AlbumCreateForm;
