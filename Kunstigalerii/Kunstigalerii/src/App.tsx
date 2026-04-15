import { useState } from 'react'
import './App.css'
import DoComments from './Comments';

type comment = {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [ToDoComments, setcomment] = useState<comment[]>([]);
  const [newcomment, setNewcomment] = useState('');

const addcomment = () => {
  if (!newcomment.trim()) return; 
  setcomment([...ToDoComments, { id: Date.now(), text: newcomment.trim(), completed: false }]);
  setNewcomment('');
  };
  const togglecomment = (id: number) => {
    
    setcomment(ToDoComments.map(comment => 
      comment.id === id ? { ...comment, completed: !comment.completed } : comment
    ));
  };

  const deletecomment = (id: number) => {
    
    setcomment(ToDoComments.filter(comment => comment.id !== id));
  };


  return (
    <div className="App">
      <h1>Comment List</h1>
      {/* Comment List UI goes here */}
      <div className="input-row">
        <input 
          type="text"
          value={newcomment}
          onChange={e => setNewcomment(e.target.value)}
          placeholder="Add a comment"
          onKeyDown={e => e.key === 'Enter' && addcomment()}
        />
        <button onClick={addcomment}>Add</button>
      </div>
      <ul className="comment-list">
        {ToDoComments.map(comment => (
          <DoComments 
            key={comment.id} 
            comment={comment}
            togglecomment={togglecomment}
            deletecomment={deletecomment}
            />
        ))}
      </ul>
    </div>
  );
};

export default App