import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IoStar } from 'react-icons/io5';
import './App.css';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-IN');

axios.defaults.baseURL = 'http://localhost:5000';

const createCustomIcon = (color) => {
  const icon = document.createElement('div');
  icon.innerHTML = `<span class="material-icons" style="font-size:24px;color:${color};">location_on</span>`;
  return L.divIcon({
    html: icon.innerHTML,
    className: 'custom-marker-icon',
    iconSize: [48, 48],
  });
};

const App = () => {
  const [pins, setPins] = useState([]);
  const position = [22.6708, 71.5724];
  const [currUser, setCurrUser] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // New email state
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setNewPlace({ lat, long: lng });
      },
    });
    return null;
  };

  useEffect(() => {
    const getPin = async () => {
      try {
        const res = await axios.get('/api/pins');
        setPins(res.data);
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    getPin();

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
      iconUrl: require('leaflet/dist/images/marker-icon.png').default,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post('/api/pins', newPin);
      setPins([...pins, res.data]);
      setTitle('');
      setDesc('');
      setRating(0);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', { username, email, password });
      setCurrUser(res.data.username);
      setUsername('');
      setEmail('');
      setPassword('');
      setShowModal(false);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { username, password });
      setCurrUser(res.data.username);
      setUsername('');
      setPassword('');
      setShowModal(false);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed!');
    }
  };

  const handleLogout = () => {
    setCurrUser(null);
    alert('Logout successful!');
  };

  return (
    <>
      <div className="auth-container">
        {currUser ? (
          <button className='buttons logout' onClick={handleLogout}>Log Out</button>
        ) : (
          <div className="buttons">
            <button className='buttons login' onClick={() => { setIsRegister(false); setShowModal(true); }}>Log in</button>
            <button className='buttons register' onClick={() => { setIsRegister(true); setShowModal(true); }}>Register</button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            {isRegister ? (
              <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* New email input */}
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='buttons register'>Register</button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='buttons login'>Log in</button>
              </form>
            )}
          </div>
        </div>
      )}

      <MapContainer style={{ height: '100vh', width: '100vw' }} center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {pins.length > 0 && pins.map((pin) => {
          const isCurrentUser = pin.username === currUser;
          const iconColor = isCurrentUser ? 'green' : 'slateblue';

          return (
            <Marker
              key={pin._id}
              position={[pin.lat, pin.long]}
              icon={createCustomIcon(iconColor)}
            >
              <Popup>
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place style'>{pin.title}</h4>
                  <label>Review</label>
                  <p className='desc style'>{pin.desc}</p>
                  <label>Rating</label>
                  <div className="star-container">
                    {Array.from({ length: pin.rating }, (_, index) => (
                      <IoStar key={index} className='star' />
                    ))}
                  </div>
                  <label>Information</label>
                  <span className='username'>created by <b>{pin.username}</b></span>
                  <span className='date'> {timeAgo.format(new Date(pin.createdAt))}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {newPlace && (
          <Marker position={[newPlace.lat, newPlace.long]} icon={createCustomIcon('red')}>
            <Popup>
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input type="text" placeholder='Enter a title' value={title} onChange={(e) => setTitle(e.target.value)} />
                  <label>Review</label>
                  <textarea placeholder='Add Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
                  <label>Rating</label>
                  <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className='btn' type='submit'>Add Pin</button>
                </form>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}

export default App;
