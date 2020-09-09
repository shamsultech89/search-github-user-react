import React, { useState } from 'react';


const UserForm = React.memo(props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredAvatarUrl, setEnteredAvatarUrl] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAdduser({ name: enteredName, avatar_url: enteredAvatarUrl })
    setEnteredName('');
    setEnteredAvatarUrl('');
  };

  return (
    <section className="user-form">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name" >Name</label>
          <input
            type="text"
            value={enteredName}
            onChange={event => {
              setEnteredName(event.target.value);
            }}
            className="form-control"
            id="name" />
        </div>

        <div className="form-group">
          <label htmlFor="avatar_url" >Avatar Url</label>
          <input
            type="text"
            value={enteredAvatarUrl}
            onChange={event => {
              setEnteredAvatarUrl(event.target.value);
            }}
            className="form-control"
            id="avatar_url" />
        </div>

        <div className="">
          <button type="submit" className="btn btn-primary">Add User</button>
        </div>
      </form>
    </section>
  );
});

export default UserForm;
