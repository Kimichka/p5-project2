import React, { useState } from 'react';

function CommentSection(props) {
    const [comments, setComments] = useState(props.comments || []);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        // Submit the new comment to your backend API
        const response = await fetch(`/games/${props.gameId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newComment }),
        });

        const data = await response.json();
        if (response.ok) {
            // Add the new comment to our local state to update the UI
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
                <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)} 
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
}

export default CommentSection;
