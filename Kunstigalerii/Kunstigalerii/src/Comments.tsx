import React from 'react';

type ToDo = {
    id: number;
    text: string;
    completed: boolean;
}

type Props = {
    toDo: ToDo;
    toggleToDo: (id: number) => void;
    deleteToDo: (id: number) => void;
};
const ToDoItem: React.FC<Props> = ({ toDo, toggleToDo, deleteToDo }) => {
    return (
        <li className={`todo-item ${toDo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleToDo(toDo.id)}>{toDo.text}</span>
            <button onClick={() => deleteToDo(toDo.id)}>Delete</button>
        </li>
    );
};

export default ToDoItem;