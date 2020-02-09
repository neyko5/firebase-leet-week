import firebase from "./firebase";
import React, { useReducer } from "react";
import uuid from "uuid";

const INITIAL_FORM = {
  title: "",
  type: "",
  ingredients: []
};

const types = {
  "risotto": "Risotto",
  "pasta": "Pasta",
  "steak": "Steak"
}

function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
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
      author: props.user.uid,
      created_at: new Date().getTime(),
      uuid: uuid()
    };
    firebase
      .firestore()
      .collection("cool")
      .add(data);
    setForm(INITIAL_FORM);
  }

  function clap(item){
    let data = {
      author: props.user.uid,
      created_at: new Date().getTime()
    };
    firebase
      .firestore()
      .collection("/cool/" + item.id + "/claps")
      .add(data);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div><label>Title</label>
        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        /></div>
        <div>
          <label>Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            {Object.entries(types).map(([key, val]) => {
              return <option value={key}>{val}</option>
            })}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            {Object.entries(types).map(([key, val]) => {
              return <option value={key}>{val}</option>
            })}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ol>
        {list.map(item => {
          return <li key={item.id}>{item.title} <button onClick={() => clap(item)}>Add clap</button></li>;
        })}
      </ol>
    </>
  );
}

export default Recipies;
