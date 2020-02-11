import React from "react";
import "./App.css";
import firebase from "./firebase";
import Recipies from "./Recipies";

function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    let lsUser = localStorage.getItem("user");
    if (lsUser) {
      let user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <Recipies user={user}></Recipies>
        ) : (
          <button onClick={loginWithGoogle}>Login with Google</button>
        )}
      </header>
    </div>
  );
}

export default App;
