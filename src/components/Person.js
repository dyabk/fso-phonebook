import React from 'react'

const Person = ({name, number}) => 
    <li>
        {name} {number} 
        <button onClick={() => console.log('Marked for deletion')}>delete</button>
    </li>

export default Person