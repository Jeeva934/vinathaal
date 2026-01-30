// // src/components/templates/TemplateOne.jsx
// const TemplateOne = ({ editedConfig }) => {
//     const formatDate = (dateString: string) => {
//     if (!dateString) return "Date: ___________";
//     const date = new Date(dateString);
//     return `Date: ${date.toLocaleDateString()}`;
//   };
//   return (
//     <div id="question-paper-content" className="relative">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold">{editedConfig.university || "University Name"}</h2>
//         <h3 className="text-xl">{editedConfig.subjectName}</h3>
//         <div className="flex justify-between text-sm mt-2 border-b pb-2">
//           <span>{formatDate(editedConfig.examDate)}</span>
//           <span>Time: {editedConfig.duration || "Duration:_____"} Hrs</span>
//           <span>Total: {editedConfig.totalMarks}</span>
//         </div>
//       </div>

//       {editedConfig.sections?.map((section, i) => (
//         <div key={section.id} className="mb-6">
//           <h4 className="font-semibold mb-4">{section.name}</h4>
//           {section.questions?.map((q, idx) => (
//             <div key={q.id} className="mb-3">
//               {idx + 1}. {q.text} [{q.marks} Marks]
//             </div>
//           ))}
//         </div>
//       ))}

//       {/* Footer */}
//       <div className="footer mt-12 pt-4 border-t border-slate-200 text-center">
//         <p className="text-sm text-slate-500">
//           Generated using AI Question Paper Generator • {editedConfig.university || "University"} Format
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TemplateOne;




// src/components/templates/TemplateOne.jsx
const TemplateOne = ({ editedConfig }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };
  return (
    <div id="question-paper-content" className="relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">{editedConfig.university || "University Name"}</h2>
        <h3 className="text-xl">{editedConfig.subjectName}</h3>
        <div className="flex justify-between text-sm mt-2 border-b pb-2">
          <span>{formatDate(editedConfig.examDate)}</span>
          <span>Time: {editedConfig.duration || "Duration:_____"} Hrs</span>
          <span>Total: {editedConfig.totalMarks}</span>
        </div>
      </div>

      {editedConfig.sections?.map((section, i) => (
        <div key={section.id} className="mb-6">
          <h4 className="font-semibold mb-4">{section.name}</h4>
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

      {/* Footer */}
      <div className="footer mt-12 pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          Generated using AI Question Paper Generator • {editedConfig.university || "University"} Format
        </p>
      </div>
    </div>
  );
};

export default TemplateOne;