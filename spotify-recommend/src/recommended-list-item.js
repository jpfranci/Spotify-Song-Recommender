import React, { Component } from 'react';
import './login-page.css';
import {Collapse} from 'react-collapse';
import logo from './spotify-logo.png'
import {FaSpotify} from 'react-icons/fa';
import {IoIosPlayCircle, IoIosArrowDown} from "react-icons/io";
import expandButton from './expand-button.png';

class RecommendedListItem extends Component {
    constructor(props) {
        super(props);
        const listItem = this.props.listItem;

        this.state = {
            albumName: listItem.album.name,
            albumUrl: listItem.album.external_urls.spotify,
            artistName: listItem.artists[0].name,
            albumCover: listItem.album.images[2].url,
            id: listItem.id,
            previewUrl: listItem.preview_url,
            songName: listItem.name, 
            spotifyUrl: listItem.external_urls.spotify,
            popularity: listItem.popularity, 
            topTracks: listItem.topTracks,
            isOpened: false
        }
        this.scrollRef = React.createRef();
        this.handleListItemClicked = this.handleListItemClicked.bind(this);
        this.handleUrlClick = this.handleUrlClick.bind(this);
    }

    componentDidMount() {
        let doc = document.getElementById(this.state.id);
        doc.scrollIntoView();
    }

    handleListItemClicked() {
        this.setState (state => ({
            isOpened: !state.isOpened
        }));
    }

    handleUrlClick(urlType) {
        window.open(this.state[urlType], '_blank');
    }

    onPlayClicked() {
        this.props.playClicked(this.state.previewUrl);
    }

    render() {
        return (
            <li 
                id = {this.state.id} 
                className = 'list-item-li' >
                <div className = "list-item">
                    <img 
                        src = {this.state.albumCover} 
                        onClick = {() => {this.handleUrlClick('albumUrl')}}
                        className = "album-cover"
                        alt = "album cover"/>
                    <h2 
                        className = "song-details"
                        onClick = {this.handleListItemClicked}>
                        {this.state.artistName + " - " + this.state.songName} 
                    </h2>     
                    <FaSpotify 
                        onClick = {() => {this.handleUrlClick('spotifyUrl')}}
                        className = "url-logo" 
                        alt = "spotify link"/>
                    <audio src = {this.state.previewUrl}
                           className = "audio-preview" 
                           id = {this.state.previewUrl}      
                           controls/>
  
                    <IoIosArrowDown 
                        onClick = {this.handleListItemClicked}
                        className = 'expand-button'/>      
                </div>
                <Collapse isOpened = {this.state.isOpened}> 
                    <div className = "collapsible">
                        <h2 className = "collapsible-header">{"Top Tracks by " + this.state.artistName}</h2>
                    </div>
                </Collapse>
            </li>
        );
    }
}

export default RecommendedListItem; 