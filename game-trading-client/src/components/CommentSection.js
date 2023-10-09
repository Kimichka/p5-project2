import React, { useState } from 'react';

function CommentSection(props) {
    const [comments, setComments] = useState(props.comments || []);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        const response = await fetch(`http://localhost:5555/games/${props.gameId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newComment }),
        });

        const data = await response.json();
        if (response.ok) {
            setComments([...comments, data]);
            setNewComment('');
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
            <div>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
}

export default CommentSection;
