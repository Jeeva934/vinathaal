
// // src/components/templates/TemplateThree.jsx
// const TemplateThree = ({ editedConfig }) => {
//   const formatDate = (dateString: string) => {
//     if (!dateString) return "Date: ___________";
//     const date = new Date(dateString);
//     return `Date: ${date.toLocaleDateString()}`;
//   };
//   return (
//     <div id="question-paper-content" className="px-6 font-sans">
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-extrabold text-indigo-900">{editedConfig.university}</h2>
//         <h3 className="text-lg text-slate-700">{editedConfig.subjectName}</h3>
//         <div className="flex justify-center gap-6 text-sm mt-2">
//           <span>{formatDate(editedConfig.examDate)}</span>
//           <span>Time: {editedConfig.duration || "Duration:_____"}</span>
//           <span>Total: {editedConfig.totalMarks}</span>
//         </div>
//       </div>

//       {editedConfig.sections?.map((section) => (
//         <div key={section.id} className="mb-8">
//           <h4 className="text-indigo-800 font-bold mb-4">{section.name}</h4>
//           <div className="grid md:grid-cols-2 gap-4">
//             {section.questions?.map((q, idx) => (
//               <div key={q.id} className="border rounded-lg p-3 shadow-sm">
//                 <p>{idx + 1}. {q.text}</p>
//                 <p className="text-right text-sm text-slate-500">[{q.marks} Marks]</p>
//               </div>
//             ))}
//           </div>
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

// export default TemplateThree;



// src/components/templates/TemplateThree.tsx
import React from "react";

interface TemplateThreeProps {
  editedConfig: any;
}

const TemplateThree = ({ editedConfig }: TemplateThreeProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date: ___________";
    const date = new Date(dateString);
    return `Date: ${date.toLocaleDateString()}`;
  };

  return (
    <div id="question-paper-content" className="px-6 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-indigo-900">
          {editedConfig.university || "University Name"}
        </h2>
        <h3 className="text-lg text-slate-700">
          {editedConfig.subjectName || "Subject Name"}
        </h3>
        <div className="flex justify-center gap-6 text-sm mt-2">
          <span>{formatDate(editedConfig.examDate)}</span>
          <span>Time: {editedConfig.duration || "Duration:_____"} </span>
          <span>Total: {editedConfig.totalMarks || "___"}</span>
        </div>
      </div>

      {/* Sections and Questions */}
      {editedConfig.sections?.map((section) => (
        <div key={section.id} className="mb-8">
          <h4 className="text-indigo-800 font-bold mb-4">{section.name}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {section.questions?.map((q, qIdx) => (
              <div key={q.id} className="border rounded-lg p-3 shadow-sm">
                <p>{qIdx + 1}. {q.text} [{q.marks} Mark{q.marks !== 1 ? "s" : ""}]</p>

                {/* Render Sub-questions */}
                {q.subQuestions && q.subQuestions.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1">
                    {q.subQuestions.map((subQ, subIdx) => (
                      <p key={subQ.id}>
                        {String.fromCharCode(97 + subIdx)}. {subQ.text} [{subQ.marks} Mark{subQ.marks !== 1 ? "s" : ""}]
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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

export default TemplateThree;