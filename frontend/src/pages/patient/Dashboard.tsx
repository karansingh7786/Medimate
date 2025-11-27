import { Link } from "react-router-dom";

export default function PatientDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to MediMate</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Link to="/patient/book">
          <div className="p-6 bg-blue-500 text-white rounded-xl shadow">
            <h2 className="text-xl font-semibold">Book Appointment</h2>
          </div>
        </Link>
                  <Link to="/patient/chatbot">
                    <div className="p-6 bg-pink-500 text-white rounded-xl shadow">
              <h2 className="text-xl font-semibold">AI Chatbot</h2>
            </div>
          </Link>


        <Link to="/patient/my-appointments">
          <div className="p-6 bg-green-500 text-white rounded-xl shadow">
            <h2 className="text-xl font-semibold">My Appointments</h2>
          </div>
        </Link>

        <Link to="/patient/ai">
          <div className="p-6 bg-purple-500 text-white rounded-xl shadow">
            <h2 className="text-xl font-semibold">AI Features</h2>
          </div>
        </Link>

      </div>
    </div>
  );
}
