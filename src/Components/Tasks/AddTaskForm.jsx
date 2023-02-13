import React, {useState} from 'react';
import AddSVG from '../../Assets/icons/plus.svg';
import axios from 'axios';

const AddTaskForm =({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [isSending, setIsSending] = useState('');

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setTextValue('');
    };

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: textValue,
            completed: false
        };
        setIsSending(true);
        axios.post('http://localhost:3001/tasks', obj).then (({data}) => {
            onAddTask(list.id, data);
            toggleFormVisible();
        })
        .catch(() => {
            alert('Error when adding task!')
        })
        .finally(() => {
            setIsSending(false);
        });
    };
    
    return (
        <div className="tasks_form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks_form-new">
                    <img src={AddSVG} alt="Add project icon"/>
                    <span>New task</span>
                </div> 
            ) : ( 
                <div className="tasks_form-block">
                    <input value={textValue} className="field" type="text" placeholder="Task name" onChange={e => setTextValue(e.target.value)}/>
                    <button disabled={isSending} onClick={addTask} className="button">
                        {isSending ? 'Adding...' : 'Add task'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button-grey">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AddTaskForm;