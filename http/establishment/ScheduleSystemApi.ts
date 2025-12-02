import api from "../scheduleSystemApiConfig";


const getEstablishmentServices = (establishmentId: string) => {
  return api.get(`/api/establishment/${establishmentId}`);
}

const getServiceDetails = (serviceId: string) => {
  return api.get(`/api/service/${serviceId}`);
}

const getAvailableTimes = (professionalId: string, date: string) => {
  return api.get(`/api/employee/${professionalId}/available-times`, {
    params: {
      date: date
    }
  });
}

export { getServiceDetails, getEstablishmentServices, getAvailableTimes };
