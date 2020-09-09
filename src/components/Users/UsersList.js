import React from 'react';

const defaultAvatarUrl = 'https://cdn4.buysellads.net/uu/1/41334/1550855391-cc_dark.png';

const UsersList = props => {
  return (
    <section>
      <h2>Loaded Users</h2>
      <ul className="list-group text-left">
        {props.users.map(user => (
          <li
            className="list-group-item"
            key={user.github_id}>
            <div className="row">
              <img
                src={user.avatar_url || defaultAvatarUrl}
                className="col-md-2 User-avatar"
                alt="avatar" />
              <div className="col-md-10">
                <h5>
                  {user.name}
                  <button onClick={props.onRemoveUser.bind(this, user.github_id)} type="button" className="pull-right close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </h5>
                <p>Our docs and branding use a handful of primary colors to differentiate what is Bootstrap from what is in Bootstrap. In other words, if it’s purple, it’s representative of Bootstrap.</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
