import React from 'react'

function ListItem({id, title, del}) {
    return (
        <div>
            <li>
                {title}
                <span onClick={() => del(id)}>x</span>
            </li>
        </div>
    )
}

export default ListItem;
