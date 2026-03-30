import React from 'react';
import './SummaryResults.css';

function SummaryResults() {

  return (
   <div className="Summary">
      <h2>SUMMARY</h2>     
       <div>
        <li>Total Words Found: 12</li> 
       </div>
      
       <div>
        <li>Total Time: 3.25 secs</li>
       </div>    
   </div>
  );
}

export function SummaryResults({ words, totalTime }) {
  return (
    <div className="Summary-results-list">
      <h2>SUMMARY</h2>
      <ul>
        <li>Total Words Found: {words.length}</li>
        <li>Total Time: {totalTime.toFixed(2)} secs</li>
      </ul>
    </div>
  );
}