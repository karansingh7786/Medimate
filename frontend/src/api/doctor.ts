import API from "../lib/axios";

export const getTodayAppointments = (id: number) =>
  API.get(`/appointment/today-appointments/${id}`);

export const addPrescription = (data: any) =>
  API.post("/prescription/add", data);

export const getDoctorPrescriptions = (id: number) =>
  API.get(`/prescription/doctor/${id}`);

export const getDoctorProfile = (id: number) =>
  API.get(`/doctor/profile/${id}`);

export const updateDoctorProfile = (id: number, data: any) =>
  API.put(`/doctor/profile/update/${id}`, data);

export const uploadDoctorDocument = (id: number, data: any) =>
  API.post(`/doctor/${id}/upload-document`, data);

export const getDoctorSchedule = (id: number) =>
  API.get(`/doctor/schedule/${id}`);

export const updateDoctorSchedule = (id: number, data: any) =>
  API.put(`/doctor/schedule/update/${id}`, data);

export const getAllPatients = (doctorId: number) =>
  API.get(`/doctor/${doctorId}/patients`);

export const getPatientDetails = (patientId: number) =>
  API.get(`/doctor/patient/${patientId}`);
export const getPrescription = (appointmentId: number) =>
  API.get(`/prescription/get/${appointmentId}`);

export const getSummary = (appointmentId: number) =>
  API.get(`/prescription/summary/${appointmentId}`);
