import React from "react";

const History = ({ 
  saveForms,
  setFormState
}) => {
  return (
    <history className="history-step">
        {saveForms.map((form, i) => (
            <div 
              className="content-wrapper"
              onClick={() => setFormState(form)}
              key={i} 
            >
              {`> ` + form}
            </div>
        ))}
    </history>
  );
};

export default History;
