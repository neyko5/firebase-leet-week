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
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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
