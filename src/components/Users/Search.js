import React, { useState } from 'react';

const LoadingContent = (props) => {
  if (!props.loading) { return null }

  return (
    <div>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const NoRecordFoundContent = (props) => {
  if (!props.noRecordFound) { return null }

  return (
    <p className="text-danger">No Record Found.</p>
  );
};

const Search = React.memo(props => {
  const [enteredSearch, setEneterdSearch] = useState('');
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = event => {
    setLoading(true);
    setNoRecordFound(false);
    event.preventDefault();

    fetch(`https://api.github.com/users/${enteredSearch}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.message === "Not Found") {
        setNoRecordFound(true)
      }
      else {
        props.onSearchUser({
          github_id: response.id,
          name: response.name,
          avatar_url: response.avatar_url
        });
        setEneterdSearch('');
      }
      setLoading(false);
    })
    .catch(error => {
      console.log("Error : ", error)
      setLoading(false);
    })
  };

  return (
    <section className="search">
      <div className="form-group row">
        <label htmlFor="search" className="col-sm-2 col-form-label">Seach by Name</label>
        <div className="col-sm-10">
          <form onSubmit={submitHandler} className="form-inline">
            <div className="form-group col-sm-4">
              <input
                type="text"
                value={enteredSearch}
                onChange={event => setEneterdSearch(event.target.value)}
                className="form-control"
                id="search" />
            </div>
            <button type="submit" className="btn btn-primary margin-right1per">Search User</button>
            <LoadingContent loading={loading} />
            <NoRecordFoundContent noRecordFound={noRecordFound}/>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Search;
