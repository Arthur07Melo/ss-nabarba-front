import api from "../scheduleSystemApiConfig";

const getEstablishment = (establishmentId: string) => {
  return api.get(`/establishment/${establishmentId}`);
}

const getEstablishmentServices = (establishmentId: string) => {
  return api.get(`/services-mock`);
}

export { getEstablishment, getEstablishmentServices };
