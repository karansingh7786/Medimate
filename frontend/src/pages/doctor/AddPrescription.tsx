import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addPrescription } from "../../api/doctor";
import { toast } from "sonner";

const AddPrescription = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    diagnosis: "",
    treatment: "",
    medication: "",
    dosage: "",
    instructions: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addPrescription({
        appointment_id: Number(appointmentId),
        ...form,
      });

      toast.success("Prescription added successfully!");
      navigate("/doctor/dashboard");
    } catch (err) {
      toast.error("Error creating prescription");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Prescription</h1>

      <div className="space-y-4">

        <input
          name="diagnosis"
          placeholder="Diagnosis"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <textarea
          name="treatment"
          placeholder="Treatment Plan"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="medication"
          placeholder="Medication"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="dosage"
          placeholder="Dosage"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <textarea
          name="instructions"
          placeholder="Additional Instructions"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddPrescription;
