import React from 'react';
import './Tasks.scss';
import EditSvg from '../../Assets/icons/edit.svg';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';

const Tasks = ({list, onEditTitle, onAddTask}) => {
    const editTitle = () => {
        const newTitle = window.prompt("Project name", list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
            })
            . catch(() => {
                alert('Failed to update project name')
            })
        }
    }

    return (
        <div className="tasks">
            <h1 className="tasks_title">
            {list.name}
            <img 
                onClick={editTitle}
                src={EditSvg} 
                alt="Edit project's name icon" 
                className="tasks_title_editBTN"/>
            </h1>
            <div className="tasks_items">
                {!list.tasks.length && <h2>There are no tasks in this project</h2>}
                {list.tasks.map(task => (
            <div key={task.id} className="tasks_items-text">
                <div className="checkbox">
                    <input id={`⁠task-${task.id}`} type="checkbox"/>
                    <label htmlFor={`⁠task-${task.id}`}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"  
                        viewBox="0 0 30 30" 
                        width="20px" 
                        height="15px"
                        stroke="black"
                        stroke-widths="100px">
                        <path 
                            d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
                            stroke="black"/>
                    </svg>
                    </label>
                </div>
                <input readOnly value={task.text}/>
            </div>
            ))}
            <AddTaskForm list ={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
};

export default Tasks;