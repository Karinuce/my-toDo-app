import React, {useEffect, useState} from 'react';
import List from '../List';
import './AddBList.scss';
import ColorBadge from '../ColorBadges';
import CloseSvg from '../../Assets/icons/close.svg';
import axios from 'axios';

const AddBList = ({colors, onAdd}) => {
    const[visibleWindow, showWindow] = useState(false);
    const[selectedColor, selectColor] = useState(3);
    const[textValue, setTextValue] = useState('');
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)){
        selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        showWindow(false);
        setTextValue('');
        selectColor(colors[0].id);
    }

    const addList = () => {
        if (!textValue) {
            alert("Please enter project's name");
            return;
        }
        setIsLoading(true);
        axios
        .post('http://localhost:3001/lists', {
            name: textValue, 
            colorId: selectedColor})
        .then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0];
            const listObj ={...data, color, tasks: []};
            onAdd(listObj);
            onClose();
        })
        .catch(() => {
            alert('Error when adding project!')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="addB-list">
            <List 
            onClick={() => showWindow(!visibleWindow)}
                items={[
                {
                    className: "list_add-button",
                    icon: (
                        <svg 
                            width="13px"
                            height="13px" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" 
                                fill="#0F1729"/>
                        </svg>
                    ),
                    name: 'Add project'
                }
                ]}
            />
            {visibleWindow && (
            <div className="addB-list_extra-window">
                <img 
                    onClick={() => onClose()}
                    src={CloseSvg} 
                    alt="Close window button" 
                    className="addB-list_extra-window-closeBTN"/>
                <input 
                    value={textValue} 
                    onChange={e => setTextValue(e.target.value)}
                    className="field" 
                    type="text" 
                    placeholder="Project name"/>
                <div className="addB-list_extra-window-colors">
                    {colors.map(color => (
                        <ColorBadge 
                            onClick={() => selectColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                        />
                    ))}
                </div>
                <button onClick={addList} className="button">
                    {isLoading ? 'Adding...' : 'Add'}
                </button>
            </div>)}
        </div>
    );
};

export default AddBList;