import { useState, useEffect } from 'react';

const DeleteClub = () => {
    const [clubs, setClub] = useState([])
    useEffect(() => {
        const xyz = () => {
            console.log('useme')
            fetch(`http://localhost:7000/getallclubs`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('visible?', data)
                    setClub(data);
                })
            // console.log('hm23', clubdata)
            // setClub(clubdata)
        }
        xyz()
    }, [])
    // console.log('10:40 done', clubs)
    const deletethisclub = async (clubId) => {
        const response = await fetch(`/clubs/${clubId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('deleted, now res:', response)
        // setClub(response)
        window.location.reload();

    }
    return (
        <div className='h-screen w-full ml-96 mt-24 text-black'>


            <h1 className='text-2xl' >DeleteClubs</h1> 
            {clubs.length > 0 && clubs?.map((c, i) => {
                return (
                    <div className='flex mt-4 shadow-md p-4 rounded-md justify-between hover:bg-gray-200' key={i}>
                        {c.club}
                        <div className='text-red-600 cursor-pointer' onClick={() => deletethisclub(c._id)}>Delete</div>
                    </div>
                )
            })}


        </div>
    )
}
export default DeleteClub;