import React, { useState, useEffect } from "react";
const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = () => {
        fetch('/allusers')
            .then(res => res.json())
            .then((result) => {
                setUsers(result)
            })
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <div className="text-black ml-96 mt-24">
            <h1 className="text-3xl mb-4">Students</h1>
            {users?.map((user, i) => {
                return (
                    <div className="w-[40rem] bg-white shadow-md rounded-md mt-4  p-4" key={i}>
                        <p>Name: {user?.name}</p>
                        <p>Club: {user?.club}</p> 
                    </div>
                )
            })}
        </div>
    )
}
export default ViewUsers;