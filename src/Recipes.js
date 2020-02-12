//import firebase from "./firebase";
import React from "react";
import uuid from "uuid";
import Recipe from "./Recepe";

const INITIAL_FORM = {
  title: "",
  type: "Risotto",
  difficulty: 1,
  ingredients: []
};

const types = {
  Risotto: "Risotto",
  Pasta: "Pasta",
  Steak: "Steak"
};

function Recipes(props) {
  const [list, setList] = React.useState({});
  const [form, setForm] = React.useState(INITIAL_FORM);

  function onSubmit(e) {
    e.preventDefault();

    let data = {
      ...form,
      author: props.user.uid,
      created_at: new Date().getTime(),
      uuid: uuid(),
      claps: []
    };
    setList({ ...list, [data.uuid]: data });
    setForm(INITIAL_FORM);
  }

  function clap(item) {
    let clapData = {
      author: props.user.email,
      uuid: uuid(),
      created_at: new Date().getTime()
    };
    let listItem = list[item.uuid];
    listItem.claps = [...listItem.claps, clapData];
    setList({ ...list, [item.uuid]: listItem });
  }

  return (
    <>
      <h2>Create new recipe</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label>Difficulty: </label>
          <select
            value={form.difficulty}
            onChange={e => setForm({ ...form, difficulty: e.target.value })}
          >
            {[...Array(5).keys()].map(key => {
              return (
                <option key={key} value={key + 1}>
                  {key + 1}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Type: </label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            {Object.entries(types).map(([key, val]) => {
              return (
                <option value={key} key={key}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>List of recipes</h2>
      <ol>
        {Object.entries(list).map(([key, item]) => {
          return <Recipe item={item} key={key} onClap={clap}></Recipe>;
        })}
      </ol>
    </>
  );
}

export default Recipes;
