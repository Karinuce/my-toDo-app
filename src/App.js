import React from 'react';
import List from './Components/List';
import AddBList from './Components/AddBList';

function App() {
  return (
    <div className="toDo">
      <div className="toDo_sidebar">
        <List 
          items={[
            {
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
              active: true
            }
          ]}
        />
        <List 
          items={[
            {
              color: 'green',
              name: 'Groceries'
            },
            {
              color: 'blue',
              name: 'Job'
            },
            {
              color: 'pink',
              name: 'Studies',
            }
          ]}
          // isRemovable={true}
        />
        <AddBList/>
      </div>
      <div className="toDo_tasks">
      </div>
    </div>
  );
}

export default App;
