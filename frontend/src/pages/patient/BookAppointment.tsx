import { useEffect, useState } from "react";
import { getMyAppointments } from "../../api/patient";
import { Link } from "react-router-dom";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments(1).then((res) => {
      setAppointments(res.data.appointments);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      {appointments.map((a: any) => (
        <div key={a.appointment_id} className="p-4 border rounded-lg mb-3">
          <p><b>Doctor:</b> {a.doctor_name}</p>
          <p><b>Date:</b> {a.date}</p>
          <p><b>Time:</b> {a.time}</p>
          <p><b>Symptoms:</b> {a.symptoms}</p>
          <Link
            className="text-blue-600 underline"
            to={`/patient/prescription/${a.appointment_id}`}
          >
            View Prescription
          </Link>
        </div>
      ))}
    </div>
  );
}
