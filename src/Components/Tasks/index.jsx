import React from 'react';
import './Tasks.scss';
import EditSvg from '../../Assets/icons/edit.svg';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import Task from './Task'
import {NavLink} from 'react-router-dom';

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty}) => {
    const editTitle = () => {
        const newTitle = window.prompt("Project name", list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
            })
                .catch(() => {
                alert('Failed to update project name')
            })
        }
    }

    return (
        <div className="tasks">
            <NavLink to={`/lists/${list.id}`}>
                <h1 style={{color: list.color.hex}}
                    className="tasks_title">
                        {list.name}
                    <img 
                        onClick={editTitle}
                        src={EditSvg} 
                        alt="Edit project's name icon" 
                        className="tasks_title_editBTN"/>
                </h1>
            </NavLink>
            <div className="tasks_items">
                {!withoutEmpty && list.tasks && !list.tasks.length && 
                    <h2>There are no tasks in this project</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task 
                        key={task.id} 
                        list= {list} 
                        onEdit={onEditTask}
                        onRemove={onRemoveTask}  
                        onComplete={onCompleteTask} 
                        {...task}/>
                ))}
            <AddTaskForm key={list.id} list ={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
};

export default Tasks;