import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  //console.log(user);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then(res => {
        //console.log(res);
        setUser(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function removeUser(id) {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then(res => {
        setUser(user.filter(remainingUser => remainingUser.id !== id));
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="App">
      {user
        ? user.map(char => (
            <div key={char.id}>
              <h4>{char.name}</h4>
              <p>{char.bio}</p>
              <button onClick={e => removeUser(char.id)}>X</button>
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
