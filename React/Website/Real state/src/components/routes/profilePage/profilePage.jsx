import React from 'react'
import './profilePage.scss'
import List from '../../list/List'
import Chat from '../../chat/Chat'

function profilePage() {
  return (
    <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg" alt="" />
            </span>

            <span>Username: <b>Rahul singh</b></span>
            <span>E-mail: <b>rahul@gmail.com</b></span>
          </div>

          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
            <List/>

          <div className="title">
            <h1>Saved List</h1>
          </div>
            <List/>
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  )
}

export default profilePage