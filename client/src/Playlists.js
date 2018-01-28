import React, { Component } from 'react';
import './Playlists.css';
import LocaleFields from './LocaleFields';
import Country from './Country';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      featuredPlaylists: { list: '' },
      locale: "pt_BR",
      country: "BR",
      lastUpdated: this.getCurrentTime()
    }
  }

  onUpdateLocale = (val) => {
    this.setState({
      locale: val
    }, () => {
      this.getFeaturedPlaylists();
    });
  };

  onUpdateCountry = (val) => {
    this.setState({
      country: val
    }, () => {
      this.getFeaturedPlaylists();
    });
  };

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getFeaturedPlaylists(){
    spotifyApi.getFeaturedPlaylists({locale: this.state.locale, country: this.state.country})
      .then((response) => {
        this.setState({
          featuredPlaylists: { 
              list: response.playlists.items
            }
        });
      })
      .catch(function(error) {
        let errorMessage = JSON.parse(error.response);
        alert(errorMessage['error']['message']);
      });
  }

  getCurrentTime = () => {
    let currentDate = new Date();
    let currentTime = `${currentDate.getHours()}h${currentDate.getMinutes()}m${currentDate.getSeconds()}s`;

    return currentTime;
  }

  componentDidMount() {
    this.state.loggedIn ? false : window.location = "http://localhost:8888";
    this.state.loggedIn
    ? this.getFeaturedPlaylists()
    : false;
    this.state.loggedIn 
    ? this.interval = setInterval(() => {
        this.getFeaturedPlaylists();
        this.setState({ lastUpdated: this.getCurrentTime()});
      }, 30 * 1000)
    : false;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let featuredPlaylistItem = Object.keys(this.state.featuredPlaylists.list).map((key) => 
      <li key={this.state.featuredPlaylists.list[key]['id']}>
        <a href={this.state.featuredPlaylists.list[key]['external_urls']['spotify']} target="_blank">
          <img src={this.state.featuredPlaylists.list[key]['images'][0]['url']} />
        </a>
      </li>
    )

    return (
      <div className="Playlists">
        <h1>Spotifood</h1>
      { !this.state.loggedIn && 
        <a href="http://localhost:8888">Login to Spotify</a>
        }
        { this.state.loggedIn &&
          <div>
            <LocaleFields onUpdate={this.onUpdateLocale} />
            <Country onUpdate={this.onUpdateCountry} />
            <ul>
             {featuredPlaylistItem}
            </ul>
          </div>
        }
        <div>
        </div>
        { this.state.loggedIn && 
          <div>          
            <h4>Atualizado às {this.state.lastUpdated}</h4>
          </div>
        }
      </div>
    );
  }
}

export default Playlists;
