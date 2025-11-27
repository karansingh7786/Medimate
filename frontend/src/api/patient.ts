import API from "../lib/axios";

export const getMyAppointments = (id: number) =>
  API.get(`/appointment/my-appointments/${id}`);

export const bookAppointment = (data: any) =>
  API.post("/appointment/book", data);
