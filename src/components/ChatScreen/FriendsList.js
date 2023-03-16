import React, { useState } from 'react'

function FriendsList({ friends, selectedIndex, setSelectedIndex }) {
  
  const handleChangeFrinds = (e) => {
    setSelectedIndex(e.target.id)
    console.log(e.target.id);
  }

  return (
    <div className='friends-list'>
      <ul className='list-group'>
        {
          friends.map(friend => (
            <li
              key={friend.id}
              id={friend.id}
              onClick={handleChangeFrinds}
              className={`list-group-item ${selectedIndex === friend.id ? 'active': null}`}
            >{friend.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default FriendsList
