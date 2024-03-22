import React, { useState } from "react";

const Comment = ({ comment }) => {
  const [replyVisible, setReplyVisible] = useState(false); 
  const [replyComment, setReplyComment] = useState(""); 

  const handleInputChange = (event) => {
    setReplyComment(event.target.value); 
  };

  const handleReplySubmit = () => {
    console.log("Submitted reply:", replyComment); 
    setReplyComment(""); 
    setReplyVisible(false); 
  };

  return (
    <div style={{ marginBottom: '10px', color: 'white', backgroundColor: 'black', padding: '5px', borderRadius: '5px'}}>
      <div style={{ color: 'white' }}>{comment.text}</div>
      {replyVisible && (
        <div>
          <textarea 
            style={{ 
              color: 'white', 
              backgroundColor: 'black', 
              border: '1px solid white', 
              borderRadius: '5px', 
              padding: '5px', 
              width: '100%', 
              minHeight: '50px', 
              marginBottom: '10px' 
            }} 
            value={replyComment} 
            onChange={handleInputChange} 
            placeholder="Enter your reply..." 
          />
          {replyComment && (
            <button onClick={handleReplySubmit}>Submit Reply</button>
          )}
        </div>
      )}
      <button onClick={() => setReplyVisible(!replyVisible)}>Reply</button>
      {/* Render replies recursively */}
      {comment.replies && comment.replies.map((reply, index) => (
        <div key={index} style={{ marginLeft: '20px', color: 'white' }}>
          <Comment comment={reply} /> 
        </div>
      ))}
    </div>
  );
};

export default Comment;
