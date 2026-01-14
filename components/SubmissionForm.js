// components/SubmissionForm.js
import React, { useState } from 'react';

const SubmissionForm = ({ onSubmit }) => {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(guess);
    if (isNaN(value)) {
      setFeedback("Please enter a valid number.");
    } else {
      const result = onSubmit(value);
      if (result === false) {
        setFeedback("Incorrect count. Try again or randomize again.");
      } else {
        setFeedback("Correct! Nice job.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>How many FFLs? </label>
      <input type="number" value={guess} onChange={e => setGuess(e.target.value)} />
      <button type="submit">Submit</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default SubmissionForm;
