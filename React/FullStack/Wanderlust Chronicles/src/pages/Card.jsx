import React from "react";
import { Link } from "react-router-dom";
import "../style/card.css";

function Card(props) {

    return (
        <div className="card">
            <div className="content">
                <img id="post-image" src={props.photos[0]} alt="no content" />
                <h4>{props.title}</h4>
                {props.location && (
                    <h6>
                        <span>Location : </span> {props.location}
                    </h6>
                )}
                {props.text && (
                    <p>{props.text.slice(0, 50)}...</p>
                )}
                <Link to={`/view/${props._id}`}>
                    <button>Read More</button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
