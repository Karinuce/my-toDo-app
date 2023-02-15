import React from 'react';

const Task = ({id, text, completed, list, onRemove, onEdit, onComplete}) => {
    const onChangeCheckbox = e => {
        onComplete(list.id, id, e.target.checked);
    };

    return (
        <div key={id} className="tasks_items-text">
                <div className="checkbox">
                    <input onChange={onChangeCheckbox} id={`⁠task-${id}`} type="checkbox" checked={completed}/>
                    <label htmlFor={`⁠task-${id}`}>
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
                <p>{text}</p>
                <div className="tasks_items-text-actions">
                    <div onClick={() => onEdit(list.id, {id, text})}>
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M18 9.99982L14 5.99982M2.5 21.4998L5.88437 21.1238C6.29786 21.0778 6.5046 21.0549 6.69785 20.9923C6.86929 20.9368 7.03245 20.8584 7.18289 20.7592C7.35245 20.6474 7.49955 20.5003 7.79373 20.2061L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L3.79373 16.2061C3.49955 16.5003 3.35246 16.6474 3.24064 16.8169C3.14143 16.9674 3.06301 17.1305 3.00751 17.302C2.94496 17.4952 2.92198 17.702 2.87604 18.1155L2.5 21.4998Z" 
                                stroke="#000000" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div onClick={() => onRemove(list.id, id)}>
                        <svg 
                            fill="#000000"  
                            viewBox="0 0 32 32" 
                            version="1.1" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z">
                            </path>
                        </svg>
                    </div>
                </div>
        </div>
    );
};

export default Task;