import React, {useState, useEffect} from 'react';
import {List, AddBList, Tasks} from "./Components";
import axios from 'axios';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({data}) => {
      setColors(data);
    })
  }, []);

  const onAddList = obj => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  }

  return (
    <div className="toDo">
      <div className="toDo_sidebar">
        <List 
          items={[
            {
              active: true,
              icon: (
                <svg 
                  width="16px" 
                  height="16px" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z" 
                    fill="#0F1729"/>
                </svg>
              ),
              name: 'All tasks',
            }
          ]}
        />
        {lists ? (
        <List 
          items={lists}
          onRemove={id => {
            const newLists = lists.filter(item => item.id !== id)
            setLists(newLists);
          }}
          onClickItem={item => {
            setActiveItem(item)
          }}
          activeItem={activeItem}
          isRemovable
        />
        ) : (
          'Loading...'
        )}
        <AddBList onAdd={onAddList} colors={colors}/>
      </div>
      <div className="toDo_tasks">
        {lists &&  activeItem && (
        <Tasks 
          list={activeItem} 
          onAddTask={onAddTask}
          onEditTitle={onEditListTitle}
        />
        )}
      </div>
    </div>
  );
}

export default App;
