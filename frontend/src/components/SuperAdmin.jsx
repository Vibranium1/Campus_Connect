import React, {useState} from 'react'

function SuperAdmin() {
    const [club, setClub] = useState('');
    const handleClick = () => {
        fetch('/add-club', {
            method:'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                club,
            })
        }).then(res=>res.json()).then((res) => console.log('superadmin', res))
    }
  return (
    <div className='text-black-500 bg-green-200'>
      want to add club?
      <input type='text' onChange={(e) => setClub(e.target.value)}/>
      <button onClick={handleClick}>Add club</button>
    </div>
  )
}

export default SuperAdmin;
