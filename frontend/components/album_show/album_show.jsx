import React from 'react';

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAlbum: {
        artist: {
          username: null
        },
        tracks: []
      }
    };
  }

  componentWillMount() {
    this.props.fetchAlbum(this.props.params.albumId).then(() => {
      this.setState({currentAlbum: this.props.currentAlbum});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.albumId !== nextProps.params.albumId ) {

      this.props.fetchAlbum(nextProps.params.albumId).then(() => {
        this.setState({currentAlbum: this.props.album});
      });
    }
  }

  render () {
    const artist = this.state.currentAlbum.artist;

    return (
      <div style={{backgroundColor: artist.secondary_color}} className='show-page-background'>
        <div style={{backgroundColor: artist.primary_color}} className='show-page-container'>
          <section className='show-page-header'>
            <main className='album-player'>
              <section className='song-player'>
                <div className='name-section'>
                  <h2 className='album-title'>{this.state.currentAlbum.title}</h2>
                  <h3 className='album-artist-name'>by {artist.username}</h3>
                </div>
                <div className='track-listing'>
                  <div className='inline-player'>
                    <table>
                      <tbody>
                        <tr>
                          <td className='play-cell' rowspan="2"></td>
                            <a className='play-button'></a>
                          <td className=''></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ul>
                    <li>Track 1</li>
                    <li>Track 2</li>
                  </ul>
                </div>
              </section>
              <div className='album-art'>
                <img src={`${this.state.currentAlbum.image_url}`}></img>
              </div>
            </main>
            <aside className='album-artist-info-sidebar'>
              <span className='artist-title'>{artist.username}</span>
            </aside>
          </section>
        </div>
      </div>
    );
  }
}

export default AlbumShow;