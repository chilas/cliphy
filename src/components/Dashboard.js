import React, { Component } from 'react';
import { Link } from 'react-router';
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { ShareButtons, generateShareIcon, ShareCounts } from 'react-share';
import axios from 'axios';

import { isLoggedIn } from '../utils/AuthService';

import Nav from './Nav';

const {
    FacebookShareButton,
    TwitterShareButton,
  } = ShareButtons;
  
class Dashboard extends Component {
    state = {
        gifs: []
    };

    getGifs() {
        axios.get('http://res.cloudinary.com/chilas/image/list/cliphy.json')
            .then(res => {
                this.setState({ gifs: res.data.resources })
            });
    }

    componentDidMount() {
        this.getGifs();
    }

    render() {
        const { gifs } = this.state;
        return (
            <div>
                <Nav />
                <div className="row">
                    <h3 className="col-md-12"> The Dashboard</h3>
                    <CloudinaryContext cloudName="chilas">
                        {
                            gifs.map((data, index) => (
                                <div className="col-md-4 col-sm-6 col-xs-12" key={index}>
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <Image className="img-responsive" publicId={data.public_id}></Image>
                                            </div>
                                        </div>
                                        <div className="panel-footer">
                                            Share on:
                                            <TwitterShareButton className="label label-info"
                                                title={"Cliphy"}
                                                url={`http://res.cloudinary.com/chilas/image/upload/${data.public_id}.gif`}>
                                                Twitter
                                            </TwitterShareButton>
                                            <FacebookShareButton className="label label-default"
                                                url={`http://res.cloudinary.com/chilas/image/upload/${data.public_id}.gif`}>
                                                Facebook
                                            </FacebookShareButton>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </CloudinaryContext>
                </div>
            </div>
        );
    }
}

export default Dashboard;