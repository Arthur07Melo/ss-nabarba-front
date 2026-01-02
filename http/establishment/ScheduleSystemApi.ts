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

export const getAppointments = (userPhone: string) => {
  return api.get(`/api/appointments`, {
    headers: {
      'user-phone': userPhone
    }
  });
}

export const deleteAppointment = (appointmentId: string, userPhone: string) => {
  return api.delete(`/api/appointments/${appointmentId}`, {
    headers: {
      'user-phone': userPhone
    }
  });
}

export const getServicesAsEstablishment = (establishmentAccessToken: string) => {
  return api.get(`/api/service`, {
    headers: {
      'Authorization': establishmentAccessToken
    }
  });
}

export const deleteServicesAsEstablishment = (serviceIds: string[], establishmentAccessToken: string) => {
  return api.delete(`/api/service`, {
    headers: {
      'Authorization': establishmentAccessToken
    },
    params: {
      serviceId: serviceIds
    }
  });
}

export const loginAsEstablishment = (email: string, password: string) => {
  return api.post(`/api/establishment/login`, {
    email,
    password
  });
}