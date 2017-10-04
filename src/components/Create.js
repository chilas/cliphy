import React, { Component } from 'react';
import { uploadWidget } from '../utils/WidgetHelper';
// import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import Nav from './Nav';

class Create extends Component {

    state = {
        gifUrl: "",
        startTime: 0,
        endTime: 0,
        isResult: false,
    };

    setStartTime = (e) => {
        this.setState({ startTime: e.target.value });
    }

    setEndTime = (e) => {
        this.setState({ endTime: e.target.value });
    }

    createGif = () => {
        let cloudinarySettings = {
            cloud_name: 'chilas',
            upload_preset: 'aexplrax',
            sources: ['local'],
            client_allowed_formats: ['mp4', 'webm'],
            keep_widget_open: false,
            multiple: false,
            theme: 'minimal',
        }
        uploadWidget(cloudinarySettings, (res) => {
            let result = res;
            if (result[0] !== undefined) {
                console.log("public_id:", result[0].public_id)
                this.setState({ isResult: true });
                this.setGifString(result[0].public_id);
            }
            console.log(result);
        });

    }

    setGifString = (uploadedVideoId) => {
        this.setState({
            gifUrl: `https://res.cloudinary.com/chilas/video/upload${(this.state.startTime > 0 && this.state.endTime > 0) ? '/so_' + this.state.startTime + ',eo_' + this.state.endTime : ''}/${uploadedVideoId}.gif`
        });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="col-md-6 col-md-offset-3">
                    <div className="well well-sm">
                        <form className="form-horizontal">
                            <legend>Enter start and stop time for animation and hit upload to select file</legend>
                            <div className="form-group">
                                <label htmlFor="start" className="col-md-2 control-label">Start</label>
                                <div className="col-md-10">
                                    <input type="number" value={this.state.startTime} onChange={this.setStartTime} className="form-control" id="start"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="end" className="col-md-2 control-label">End</label>
                                <div className="col-md-10">
                                    <input type="number" value={this.state.endTime} onChange={this.setEndTime} className="form-control" id="end"></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="button" className="btn btn-raised btn-primary" onClick={this.createGif}>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {
                                (this.state.isResult) ?
                                    <img className="img-responsive" src={this.state.gifUrl}></img> : <span className="label label-info">Kindly upload an mp4 video to create Gif</span>
                            }
                        </div>
                        <div className="panel-footer">
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Create;