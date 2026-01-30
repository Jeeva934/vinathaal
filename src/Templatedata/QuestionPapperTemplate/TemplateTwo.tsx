// // src/components/templates/TemplateTwo.jsx
// const TemplateTwo = ({ editedConfig }) => {
//   const formatDate = (dateString: string) => {
//     if (!dateString) return "Date: ___________";
//     const date = new Date(dateString);
//     return `Date: ${date.toLocaleDateString()}`;
//   };
//   return (
//     <div id="question-paper-content" className="font-serif border-4 border-slate-900 p-6">
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold uppercase">{editedConfig.university || "Institution"}</h1>
//         <p className="text-lg">{editedConfig.subjectName}</p>
//         <div className="flex justify-between text-sm mt-2 border-y py-1">
//           <span>{formatDate(editedConfig.examDate)}</span>
//           <span>Duration: {editedConfig.duration || "Duration:_____"} Hrs</span>
//           <span>Total: {editedConfig.totalMarks}</span>
//         </div>
//       </div>

//       {editedConfig.sections?.map((section, i) => (
//         <div key={section.id} className="mb-8">
//           <h3 className="underline font-semibold mb-3">{section.name}</h3>
//           {section.questions?.map((q, idx) => (
//             <div key={q.id} className="mb-3">
//               {idx + 1}. {q.text} [{q.marks} Marks]
//             </div>
//           ))}
//         </div>
//       ))}

//       <div className="text-center italic mt-6">*** End of Paper ***</div>
//       {/* Footer */}
//       <div className="footer mt-12 pt-4 border-t border-slate-200 text-center">
//         <p className="text-sm text-slate-500">
//           Generated using AI Question Paper Generator • {editedConfig.university || "University"} Format
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TemplateTwo;



// src/components/templates/TemplateTwo.jsx
const TemplateTwo = ({ editedConfig }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };
  return (
    <div id="question-paper-content" className="font-serif border-4 border-slate-900 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase">{editedConfig.university || "Institution"}</h1>
        <p className="text-lg">{editedConfig.subjectName}</p>
        <div className="flex justify-between text-sm mt-2 border-y py-1">
          <span>{formatDate(editedConfig.examDate)}</span>
          <span>Duration: {editedConfig.duration || "Duration:_____"} Hrs</span>
          <span>Total: {editedConfig.totalMarks}</span>
        </div>
      </div>

      {editedConfig.sections?.map((section, i) => (
        <div key={section.id} className="mb-8">
          <h3 className="underline font-semibold mb-3">{section.name}</h3>
          {section.questions?.map((q, idx) => (
            <div key={q.id} className="mb-3">
              {idx + 1}. {q.text} [{q.marks} Marks]

              {/* Render sub-questions if present */}
              {q.subQuestions && q.subQuestions.length > 0 && (
                <div className="ml-4 mt-1 space-y-1">
                  {q.subQuestions.map((subQ, subIdx) => (
                    <div key={subQ.id}>
                      {String.fromCharCode(97 + subIdx)}. {subQ.text} [{subQ.marks} Marks]
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>
      ))}

      <div className="text-center italic mt-6">*** End of Paper ***</div>
      {/* Footer */}
      <div className="footer mt-12 pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          Generated using AI Question Paper Generator • {editedConfig.university || "University"} Format
        </p>
      </div>
    </div>
  );
};

export default TemplateTwo;