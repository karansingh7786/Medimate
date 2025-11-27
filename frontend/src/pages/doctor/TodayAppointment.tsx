import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "../../api/doctor";
import { useNavigate } from "react-router-dom";

const TodayAppointments = () => {
  const doctorId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["today", doctorId],
    queryFn: () => getTodayAppointments(doctorId),
  });

  const appointments = data?.data?.appointments || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Today's Appointments</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Patient</th>
            <th className="p-2">Time</th>
            <th className="p-2">Symptoms</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a: any) => (
            <tr key={a.appointment_id} className="text-center border-t">
              <td className="p-2">{a.patient_name}</td>
              <td className="p-2">{a.time}</td>
              <td className="p-2">{a.symptoms}</td>

              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() =>
                    navigate(`/doctor/prescription/${a.appointment_id}`)
                  }
                >
                  Add Prescription
                </button>
              </td>
            </tr>
          ))}

          {appointments.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-gray-500">
                No appointments today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodayAppointments;
