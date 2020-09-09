import React, { useState, useEffect, useCallback } from 'react';

import UsersList from './UsersList';
import UserForm from './Form';
import Search from './Search';

// const dummyUserData = () => {
//   const arr =
//       [
//         {
//           id: 1,
//           name: 'Humi',
//           avatar_url: ''
//         },
//         {
//           id: 2,
//           name: 'Humaira',
//           avatar_url: ''
//         }
//       ];
//   const promise = new Promise( (resolutionFunc,rejectionFunc) => {
//     resolutionFunc(arr);
//   });
//   return promise;
// };

const baseUrl = 'http://localhost:3001/github_users';

const ErrorMessages = (props) => {
  if (!props.error) { return null }

  return (
    <div>
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {props.error}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("Response : ", response);
      setUsersData(response);
    })
    .catch(error => {
      setErrorMessage('Something went wrong.');
      console.log("Error : ", error)
    })
  }, []);

  useEffect(() => {
    console.log('RENDERING USERS', usersData);
  }, [usersData]);

  const addUserHandler = (user) => {
    setErrorMessage('');
    const userOject = { github_id: (user.github_id || Math.floor(Math.random() * 10000)), ...user };

    fetch(`${baseUrl}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({github_user: userOject})
    })
    .then(resp => resp.json())
    .then(response => {
      // console.log("Response : ", response);
      if(response.error){
        setErrorMessage(response.error);
      }
      else{
        setUsersData(previousUsers => [
          userOject, ...previousUsers
        ])
      }
    })
    .catch(error => {
      console.log("Error : ", error)
    })
  };

  const removeUserHandler = (userId) => {
    fetch(`${baseUrl}/${userId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resp => resp.json())
    .then(response => {
      setUsersData(previousUsers =>
        previousUsers.filter(user => user.github_id !== userId)
      )
    })
    .catch(error => {
      console.log("Error : ", error)
    })
  };

  const searchUserHandler = useCallback(user => {
    addUserHandler(user);
  }, []);

  return (
    <div>
      <ErrorMessages error={errorMessage} />
      <div className="card">
        <div className="card-body">
          <UserForm onAdduser={addUserHandler} />
        </div>
      </div>
      <br/>


      <section>
        <div className="card">
          <div className="card-body">
            <Search onSearchUser={searchUserHandler} />
          </div>
        </div>
        <br/>

        <div className="card">
          <div className="card-body">
            <UsersList users={usersData} onRemoveUser={removeUserHandler} />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Users;
