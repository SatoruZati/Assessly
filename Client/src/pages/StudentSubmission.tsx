import type React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import { StateContext } from "../Context API/StateContext";

interface Assignment {
  Name?: boolean;
  Class?: boolean;
  Section?: boolean;
  RollNo?: boolean;
  Department?: boolean;
  Email?: boolean;
  PhoneNumber?: boolean;
  Title?: string;
  Deadline?: string;
  [key: string]: any;
}

interface BoolField {
  key: string;
  valueState: [string, Dispatch<SetStateAction<string>>];
}

const StudentSubmission = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [assignment, setAssignments] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { setStudentName } = useContext(StateContext);
  const [nameValue, setNameValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");
  const [rollNoValue, setRollNoValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const { setOcrOutput, setSub_id } = useContext(StateContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any>(
          `http://localhost:3000/api/v1/assignments/share/${shareId}`
        );
        setAssignments(response.data.info);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [shareId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (
        file.type === "application/pdf"
      ) {
        setUploadedFile(file);
        setError(null);
      } else {
        setUploadedFile(null);
        setError("Invalid file type. Please upload a PDF.");
        event.target.value = "";
      }
    } else {
      setUploadedFile(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    const submissionData: { [key: string]: string } = {};
    const values = [
      { key: "Name", value: nameValue },
      { key: "Class", value: classValue },
      { key: "Section", value: sectionValue },
      { key: "RollNo", value: rollNoValue },
      { key: "Department", value: departmentValue },
      { key: "Email", value: emailValue },
      { key: "PhoneNumber", value: phoneNumberValue },
      { key: "hash", value:shareId?shareId:"null"}
    ];

    values.forEach(({ key, value }) => {
        if (assignment && assignment[key]) { 
            submissionData[key] = value;
        }
    });

    const formData = new FormData();
    for (const key in submissionData) {
      formData.append(key, submissionData[key]);
    }
    if (uploadedFile) {
      formData.append("assignmentFile", uploadedFile);
    } else {
        alert("Please upload the assignment file.");
        setSubmissionStatus(null);
        return;
    }

    setLoading(true); 
    try {
      setStudentName(nameValue);
      const response = await axios.post(
        "https://localhost:3000/api/v1/data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSubmissionStatus("success");
      setOcrOutput(response.data.ocrText);
      setSub_id(response.data.submissionId);
      alert("Submission successful! Redirecting to results...");
      setTimeout(() => {
        navigate("/result");
      }, 2000);
    } catch (submissionError: any) {
      setSubmissionStatus("error");
      console.error("Submission error:", submissionError);
      setError(
        submissionError.response?.data?.message || "Failed to submit data."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !assignment) { 
    return <div>Loading assignment details...</div>;
  }

  if (error && submissionStatus !== 'error') { 
    return (
      <div>
        <p>Error loading assignment: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

   if (!assignment && !loading) { 
      return <div>Assignment not found.</div>;
   }


  const boolFields: BoolField[] = [
    { key: "Name", valueState: [nameValue, setNameValue] },
    { key: "Class", valueState: [classValue, setClassValue] },
    { key: "Section", valueState: [sectionValue, setSectionValue] },
    { key: "RollNo", valueState: [rollNoValue, setRollNoValue] },
    { key: "Department", valueState: [departmentValue, setDepartmentValue] },
    { key: "Email", valueState: [emailValue, setEmailValue] },
    { key: "PhoneNumber", valueState: [phoneNumberValue, setPhoneNumberValue] },
  ];

  return (
    <div>
      <h1>{assignment?.Title || "Assignment Submission"}</h1>
      {assignment?.Deadline && (
        <p>Deadline: {assignment.Deadline}</p>
      )}

      {submissionStatus === "success" && (
        <div>Submission Successful! Redirecting...</div>
      )}

       {submissionStatus === "error" && (
         <div>
            <p>Submission Error: {error}</p>
            <button onClick={() => setSubmissionStatus(null)}>Try Again</button> 
         </div>
       )}

      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        {boolFields.map(({ key, valueState }) => {
          const [value, setValue] = valueState;
          if (assignment && assignment[key]) {
            const labelText = key.replace(/([A-Z])/g, " $1").trim();
            return (
              <div key={key}>
                <label htmlFor={key}>
                  {labelText} {assignment[key] && <span>*</span>}
                </label>
                <input
                  type={
                    key === "Email" ? "email" : key === "PhoneNumber" ? "tel" : "text"
                  }
                  id={key}
                  name={key}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Enter your ${labelText}`}
                  required={assignment[key]}
                />
              </div>
            );
          }
          return null;
        })}

        <h2>Assignment File</h2>
        <div>
          <label htmlFor="assignmentFile">
            Upload Assignment File (PDF only) <span>*</span>
          </label>
          <input
            id="assignmentFile"
            name="assignmentFile"
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            required 
          />
          {uploadedFile && (
              <div>
                  <p>Selected: {uploadedFile.name}</p>
                  <button type="button" onClick={() => {
                      setUploadedFile(null);
                      const fileInput = document.getElementById('assignmentFile') as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                  }}>
                      Remove
                  </button>
              </div>
          )}
          {error === "Invalid file type. Please upload a PDF." && (
              <p style={{ color: 'red' }}>{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submissionStatus === "submitting" || loading}
        >
          {loading || submissionStatus === "submitting" ? "Submitting..." : "Submit Assignment"}
        </button>
      </form>
    </div>
  );
};

export default StudentSubmission;