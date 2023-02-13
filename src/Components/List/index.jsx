import React from 'react';
import './List.scss';
import classNames from 'classnames';
import ColorBadge from '../ColorBadges';
import CancelSvg from '../../Assets/icons/cancel.svg'
import axios from 'axios';

function List ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) {
    const removeList = (item) => {
        if (window.confirm('Delete this project from the list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
            onRemove(item.id);
            });
        }
    }
    return (
    <ul onClick={onClick} className="list">
        {items.map((item, index) => (
            <li key={index} className={classNames(item.className, {active: item.active ? item.active : activeItem && activeItem.id === item.id})}
                onClick={onClickItem ? () => onClickItem(item) : null}
            >
                <i>
                    {item.icon ? (
                        item.icon
                    ) : (
                        <ColorBadge color={item.color.name}/>
                    )}
                </i>
                <span>
                    {item.name}
                    {item.tasks && ` (${item.tasks.length})`}
                </span>
                {isRemovable &&
                    <img 
                        onClick={() => removeList(item)}
                        src={CancelSvg} 
                        alt="Remove the project from the list button" 
                        className="list_cancelBTN"/>
                }
            </li>
        ))}
    </ul>
    );
};

export default List;