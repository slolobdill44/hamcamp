import React from 'react';
import LoadingSpinner from '../loading_spinner';
import { hashHistory } from 'react-router';

class TrackCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      trackNumber: 1,
      trackFile: null
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
      this.setState({ trackFile: file });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    const trackInt = parseInt(this.state.trackNumber);

    formData.append("track[name]", this.state.name);
    formData.append("track[album_track_number]", trackInt);
    formData.append("track[track_url]", this.state.trackFile);
    formData.append("track[album_id]", this.props.albumId);

    this.props.createTrack(formData)
      .then((res) => {
        hashHistory.push(`/albums/${this.props.albumId}`);
      });
  }

  render () {

    if (this.props.loading.isLoading) {
      return <section className='album-form-container'>
              <div className='album-form-info'>
                <LoadingSpinner />
              </div>
            </section>;
    }

    return (
      <div className='album-form-container'>
        <section className='album-form-info'>


          <form className='album-form' onSubmit={this.handleSubmit}>
            <h2 className='album-form-headers'>Create Track</h2>
              <div className='album-form-inputs'>
                <div  className='form-data-type'>
                  Name:
                </div>
                <label>
                  <input
                    className='album-title'
                    type="text"
                    value={this.state.name}
                    onChange={this.update('name')}
                    placeholder="Track name"/>
                </label>
                <br />

                <div className='form-data-type'>
                  Track Number:
                </div>
                <input
                  className='track-number'
                  type="text" min="1" pattern="\d*"
                  value={this.state.trackNumber}
                  onChange={this.update('trackNumber')} />
                <br />

                  <div className='form-data-type'>
                    Track File:
                  </div>
                <label className='album-art-upload'>
                  <input type='file' onChange={this.updateFile} />
                </label>
                <br />


                <input className='album-submit-button' type='submit' value='Add New Track' />
              </div>

          </form>
        </section>
      </div>
    );
  }
}

export default TrackCreateForm;
