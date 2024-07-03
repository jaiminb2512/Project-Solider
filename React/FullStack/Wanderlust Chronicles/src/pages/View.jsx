import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { faMapMarkerAlt, faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../authContext";
import "../style/view.css";

const View = () => {
	const { id } = useParams(); 
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [slideNumber, setSlideNumber] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`http://localhost:5500/api/entries/${id}`);
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:5500/api/entries/${id}`);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	const handleMove = (direction) => {
		if (data.photos && data.photos.length > 1) {
			let newSlideNumber;
			const size = data.photos.length;
			if (direction === "l") {
				newSlideNumber = slideNumber === 0 ? size - 1 : slideNumber - 1;
			} else {
				newSlideNumber = slideNumber === size - 1 ? 0 : slideNumber + 1;
			}
			setSlideNumber(newSlideNumber);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className='view'>
			<div className="postContainer">
				<div className="leftContainer">
					{data.photos && data.photos.length > 0 ? (
						<div className="images">
							<img src={data.photos[slideNumber]} height="200px" alt="" />
							{data.photos.length > 1 && (
								<div className="arrows">
									<FontAwesomeIcon
										icon={faCircleArrowLeft}
										className="arrow"
										onClick={() => handleMove("l")}
									/>
									<FontAwesomeIcon
										icon={faCircleArrowRight}
										className="arrow"
										onClick={() => handleMove("r")}
									/>
								</div>
							)}
						</div>
					) : (
						<p>No Images</p>
					)}
				</div>

				<div className="rightContainer">
					<div className="postPageBG">
						<div className="upperContent">
							<h1>{data.title}</h1>
							<p>
								<FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
								{data.location}
							</p>
						</div>
					</div>
					<p style={{marginLeft: "20px"}}>{data.text}</p>

					<div className='buttons'>
						{user && user._id === data.author && (
							<button className="del_button" style={{ marginRight: "5px" }} onClick={handleDelete}>
								Delete
							</button>
						)}
						<button className='edit_button' onClick={() => navigate(`/edit/${id}`)}>
							Edit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default View;
