import React, { Component } from "react";
import {placesApis} from '../../PlacesApi';

export default class PlaceCard extends Component {
    static defaultProps = {
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            pictureSrc: undefined
        };

    }

    componentWillMount() {
        //const {place_id} = this.props;
        //this._pendingPromise = this.getPhotoSrc(place_id);
    }

    componentWillReceiveProps(nextProps) {
        //this._pendingPromise = this.getPhotoSrc(nextProps.place_id);
    }

    componentWillUnmount() {
        //if (this._pendingPromise) {
        //    this._pendingPromise.cancel();
        //}
    }

    componentWillUpdate() {
        //if (this._pendingPromise) {
        //    this._pendingPromise.cancel();
        //}
    }

    getPhotoSrc(placeId) {

        this.setState({pictureSrc: undefined});

        const deferred = new Promise(
            (resolve, reject) => {
                this.props.service.getDetails({placeId}, result => {
                    if (result && result.photos && result.photos.length > 0) {
                        resolve({pictureSrc: result.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150})});
                    } else {
                        resolve({pictureSrc: null});
                    }

                    this._pendingPromise = null;
                });
            }
        );

        const _cancellablePromise = CancellablePromise(deferred);
        _cancellablePromise.promise.
            then(val => {this.setState(val)}).
            catch( reason => {});

        return _cancellablePromise;
    }

    render() {
        console.log(this.props);
        const {name, vicinity, icon, geometry} = this.props;

        const lat = geometry.location.lat();
        const lng = geometry.location.lng();
        const img = this.state.pictureSrc ? <img src={this.state.pictureSrc} alt="something"/> : null;
        return (
            <div className="thumbnail">
                {img}
                <div className="caption">

                    <div className="media">
                        <div className="media-left">
                                <img class="media-object" src={icon} alt="..." />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{name}</h4>
                            {vicinity}
                        </div>
                        <div className="media-right">
                            <a href={placesApis.requestUber(lat,lng)}>Request Uber Ride</a>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}