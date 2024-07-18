import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success");
    };

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleClearClick = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Text is cleared!", "success");
    };

    const Paragraph = () => {
        let newText = text.charAt(0).toUpperCase() + text.slice(1);
        setText(newText);
        props.showAlert("Converted to Paragraph!", "success");
    };

    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Converted to Text is copied!", "success");
    };

    const RemoveExtraSpace = () => {
        let newText = text.split(/\s+/); 
        setText(newText.join(" "));
        props.showAlert("Converted to Removed Extra Space!", "success");
    };

    const [text, setText] = useState("");

    return (
        <>
            <div className="container" style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" style={{backgroundColor: props.mode === 'dark' ? '#697681' : 'white', color: props.mode === 'dark' ? 'white' : 'gray'}} value={text} onChange={handleOnChange} id="myBox" rows="6"></textarea>
                </div>

                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={Paragraph}>Convert to Paragraph</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={RemoveExtraSpace}>Remove Extra space</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear</button>
            </div>

            <div className="container my-2" style={{color: props.mode === 'dark' ? '#f8f9fa' : 'black'}} >
                <h3>Your Text Summary</h3>
                <p>{text.split(/\s+/).filter((element) => { return element.length != 0}).length} words, {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length != 0}).length} Minutes to read</p>
                <h3>Preview</h3>
                <p>{text.length>0?text:"Nothing to preview"}</p>
            </div>
        </>
    );
}

TextForm.propTypes = {
    heading: PropTypes.string.isRequired,
};

TextForm.defaultProps = {
    heading: "Enter Text",
};

