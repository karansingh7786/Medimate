import { useEffect, useState } from "react";
import { getPrescription, getSummary } from "../../api/doctor";
import { useParams } from "react-router-dom";

export default function ViewPrescription() {
  const { appointmentId } = useParams();
  const [prescription, setPrescription] = useState<any>(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    getPrescription(Number(appointmentId)).then((res) =>
      setPrescription(res.data)
    );

    getSummary(Number(appointmentId)).then((res) =>
      setSummary(res.data.summary)
    );
  }, []);

  if (!prescription) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Prescription</h1>

      <p><b>Diagnosis:</b> {prescription.diagnosis}</p>
      <p><b>Treatment:</b> {prescription.treatment}</p>
      <p><b>Medication:</b> {prescription.medication}</p>
      <p><b>Dosage:</b> {prescription.dosage}</p>
      <p><b>Instructions:</b> {prescription.instructions}</p>

      <hr className="my-4" />

      <h2 className="text-xl font-bold">AI Summary</h2>
      <p>{summary}</p>
    </div>
  );
}
