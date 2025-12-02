import api from "../scheduleSystemApiConfig";

export type postAppointmentRequest = {
  userPhone: string;
  userName: string;
  serviceId: string;
  employeeId: string;
  appointmentDate: string;
}

export const getEstablishmentServices = (establishmentId: string) => {
  return api.get(`/api/establishment/${establishmentId}`);
}

export const getServiceDetails = (serviceId: string) => {
  return api.get(`/api/service/${serviceId}`);
}

export const getAvailableTimes = (professionalId: string, date: string) => {
  return api.get(`/api/employee/${professionalId}/available-times`, {
    params: {
      date: date
    }
  });
}

export const postAppointment = (data: postAppointmentRequest) => {
  return api.post(`/api/appointments`, data);
}
