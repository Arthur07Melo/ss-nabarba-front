import api from "../scheduleSystemApiConfig";

const getEstablishment = (establishmentId: string) => {
  return api.get(`/establishment/${establishmentId}`);
}

const getEstablishmentServices = (establishmentId: string) => {
  return api.get(`/establishment-services-mock/${establishmentId}`);
}

const getServiceDetails = (serviceId: string) => {
  return api.get(`/detail-service-by-id-mock/${serviceId}`);
}

const getAvailableTimes = (professionalId: string, date: string) => {
  return api.get(`/employee-available-times-mock/${professionalId}`, {
    params: {
      date: date
    }
  });
}

export { getServiceDetails, getEstablishmentServices, getAvailableTimes };
