import React, { useState } from 'react';
import { v4 } from 'uuid';
import './App.css';

export default function App() {
  const [myEmail, setMyEmail] = useState('');
  const [myComment, setMyComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    if (!myComment.trim() || !myEmail.trim()) {
      // eslint-disable-next-line
      alert('Por favor llena los campos requeridos');
      return;
    }
    setComments([
      ...comments,
      {
        id: v4(),
        email: myEmail,
        comment: myComment,
      },
    ]);
    setMyEmail('');
    setMyComment('');
  };

  const editComment = (data) => {
    setMyComment(data.comment);
    setMyEmail(data.email);
  };

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };
  return (
    <div className="container">
      <form className="form-container">
        <input
          placeholder="Email"
          type="email"
          value={myEmail}
          onChange={({ target }) => setMyEmail(target.value)}
        />
        <textarea
          placeholder="Comment"
          rows={5}
          onChange={({ target }) => setMyComment(target.value)}
          value={myComment}
        />
        <div className="button-container">
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </form>
      {comments.length > 0 && (
        <div className="form-container">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-container">
              <div className="comment-fl">
                <h3>{comment.email}</h3>
                <div>
                  <button type="button" onClick={() => editComment(comment)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
