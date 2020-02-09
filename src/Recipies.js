import firebase from "./firebase";
import React from "react";
import uuid from "uuid";

const INITIAL_FORM = {
  title: "",
  type: ""
};

function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    console.log(childSnapshot);
    var item = childSnapshot.data();
    item.id = childSnapshot.id;

    returnArr.push(item);
  });

  return returnArr;
}

function Recipies(props) {
  const [list, setList] = React.useState([]);
  const [form, setForm] = React.useState(INITIAL_FORM);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("cool")
      .onSnapshot(snapshot => {
        let docs = snapshotToArray(snapshot);
        setList(docs);
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    let data = {
      ...form,
      created_at: new Date().getTime(),
      uuid: uuid()
    };
    firebase
      .firestore()
      .collection("cool")
      .add(data);
    setForm(INITIAL_FORM);
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <ol>
        {list.map(item => {
          return <li key={item.id}>{item.kolega}</li>;
        })}
      </ol>
    </>
  );
}

export default Recipies;
