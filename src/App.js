import React, {useEffect, useState} from 'react';
import {addReminder, setReminder} from "./store/reminderSlice";
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import ListItem from './components/ListItem';

function App() {

  const reminders = useSelector(state => state.reminders.reminders);
  const [reminder, setterReminder] = useState("");
  const dispatch = useDispatch();

  const Submit = (e) => {
    if(e.keyCode === 13){
      const data = {title : reminder}
      fetch('/api/reminder/store', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(newdata => {
        dispatch(addReminder(newdata.reminder));
        setterReminder("");
      })
      .catch(err => console.log(err))
    }
    else{
      return;
    }
  }

  const onDelete = (id) => {
    fetch("/api/reminder/delete/"+id, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.status === 200){
        fetch("/api/reminders")
          .then(res => res.json())
          .then(data => dispatch(setReminder(data.reminders)))
          .catch(err => console.log(err))
      }
    })
  }

  useEffect(() => {
    const subscribe = fetch("/api/reminders")
    .then(res => res.json())
    .then(data => dispatch(setReminder(data.reminders)))
    .catch(err => console.log(err))
    
    return () => {
      subscribe();
    }
  }, [])

  return (
    <div className="App">
      <div className="box">
        <input type="text" className="input" onKeyUp={Submit} placeholder="Reminder" value={reminder} name="reminder" onChange={({target}) => setterReminder(target.value)}/>
          <ul className="lists">
            {
              reminders.length > 0 &&
              reminders.map(reminder => (
              <ListItem
                id={reminder.id}
                key={reminder.id}
                del={onDelete}
                title={reminder.title}
                />))
            }
          </ul>
      </div>
    </div>
  );
}

export default App;
