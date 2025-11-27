import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments, getAllPatients } from "../../api/doctor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {

  const doctorId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const { data: todayData } = useQuery({
    queryKey: ["todayAppointments", doctorId],
    queryFn: () => getTodayAppointments(doctorId),
  });

  const { data: patientsData } = useQuery({
    queryKey: ["doctorPatients", doctorId],
    queryFn: () => getAllPatients(doctorId),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Doctor Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="p-4 bg-blue-100 rounded shadow cursor-pointer"
          onClick={() => navigate("/doctor/today-appointments")}
        >
          <h2 className="text-lg font-medium">Today's Appointments</h2>
          <p className="text-3xl font-bold">
            {todayData?.data?.appointments?.length || 0}
          </p>
        </div>

        <div className="p-4 bg-green-100 rounded shadow"
          onClick={() => navigate("/doctor/patients")}
        >
          <h2 className="text-lg font-medium">Total Patients</h2>
          <p className="text-3xl font-bold">
            {patientsData?.data?.patients?.length || 0}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
