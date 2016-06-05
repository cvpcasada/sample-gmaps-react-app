import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';


/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class ListItem extends Component {
    static defaultProps = {
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        const { countryName, countryCode, id } = this.props;

        return (
            <tr>
                <td>{ countryName }</td>
                <td>
                    <StarRatingComponent
                        name={`rating-${id}`} /* name of the radio input, it is required */
                        /*value={Number} /!* number of selected icon (`0` - none, `1` - first) *!/
                         starCount={Number} /!* number of icons in rating, default `5` *!/
                         onStarClick={Function(nextValue, prevValue, name)} /!* on icon click handler *!/
                         renderStarIcon={Function(nextValue, prevValue, name)} /!* it should return string or react component *!/*/
                    />
                </td>
            </tr>

        );
    }
}