import { useEffect, useState } from "react";
import { getDoctorProfile, updateDoctorProfile } from "../../api/doctor";
import { toast } from "sonner";

const DoctorProfile = () => {
  const doctorId = Number(localStorage.getItem("userId"));

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {
    (async () => {
      const res = await getDoctorProfile(doctorId);
      setProfile(res.data);
    })();
  }, []);

  const handleChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      await updateDoctorProfile(doctorId, profile);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Error saving changes");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="space-y-4">
        <input
          className="border p-2 w-full"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <input className="border p-2 w-full" value={profile.email} disabled />

        <input
          className="border p-2 w-full"
          name="specialization"
          placeholder="Specialization"
          value={profile.specialization}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full"
          name="experience"
          placeholder="Experience"
          value={profile.experience}
          onChange={handleChange}
        />

        <button
          onClick={saveChanges}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
