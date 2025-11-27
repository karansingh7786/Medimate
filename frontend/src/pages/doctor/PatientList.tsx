import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "../../api/doctor";

const PatientsList = () => {
  const doctorId = Number(localStorage.getItem("userId"));

  const { data } = useQuery({
    queryKey: ["patientsList", doctorId],
    queryFn: () => getAllPatients(doctorId),
  });

  const patients = data?.data?.patients || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Patients</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Last Visit</th>
            <th className="p-2">Total Visits</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p: any) => (
            <tr key={p.id} className="border-t text-center">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.last_visit || "-"}</td>
              <td className="p-2">{p.total_visits || 1}</td>
            </tr>
          ))}

          {patients.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-gray-500">
                No patients yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;
