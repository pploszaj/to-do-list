import React, {useState} from "react";
import './ListForm.css'

function ListForm(props) {
    const [listInput, setListInput] = useState({})
    const [text, setText] = useState('');

    const listInputHandler = (e) => {
        setText(e.target.value)
        setListInput({name : e.target.value, todos : []});
    }

    const formHandler = (e) => {
        e.preventDefault();
        props.addListHandler(listInput);
        fetch('/api/list', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listInput)
        })
        .then(response => {
          console.log('we made it')
          console.log('new data', response)
        })
        setText('');
    }

  return (
    <div>
      <form className="list-form" onSubmit={formHandler}>
        <input
          onChange={listInputHandler}
          className="list-input"
          type="text"
          placeholder="Add a list"
          name="text"
          autoComplete="off"
          value={text}
        ></input>
        <button type="submit" className="button">ADD</button>
      </form>
    </div>
  );
}

export default ListForm;
