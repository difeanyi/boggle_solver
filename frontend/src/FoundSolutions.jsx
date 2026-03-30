import React from 'react';
import './FoundSolutions.css';

function FoundSolutions({ words, headerText }) {
  return (
    <div className="Found-solutions-list">
      {/* Conditionally render the header only if there are words to show */}
      {words.length > 0 && (
        <h4>{headerText}: {words.length}</h4>
      )}
      
      <ul>
        {/* We use .map() to turn the array of strings into a list of <li> elements */}
        {words.map((solution) => (
          <li key={solution}>{solution}</li>
        ))}
      </ul>
    </div>
  );
}

export function FoundSolutions({ words, headerText }) {
  return (
    <div className="Found-solutions-list">
      {words.length > 0 && <h4>{headerText}: {words.length}</h4>}
      <ul>
        {words.map((word) => <li key={word}>{word}</li>)}
      </ul>
    </div>
  );
}