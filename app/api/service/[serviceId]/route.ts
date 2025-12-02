import { NextRequest, NextResponse } from 'next/server';
import api from '../../../../bff/scheduleSystemApiConfig';


type establishmentServicesResponse = {
  establishment: establishmentDataResponse;
  services: serviceDataResponse[];
}

type establishmentDataResponse = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
};

type employeeDataResponse = {
  id: string;
  name: string;
  imageUrl: string;
};

type serviceDataResponse = {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  employees: employeeDataResponse[];
  price: number;
};

type serviceDetailsResponse = {
  establishment: establishmentDataResponse;
  service: serviceDataResponse;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  const { serviceId } = await params;
  console.log(serviceId)

  if (typeof serviceId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid service ID' },
      { status: 400 }
    );
  }

  try {
    const serviceDetailsResponse = await api.get<serviceDetailsResponse>(`/detail-service-by-id-mock/${serviceId}`);

    return NextResponse.json(serviceDetailsResponse.data);
  } catch (error) {
    // Lidar com erros da API principal
    return NextResponse.json({ message: 'Failed to fetch establishment data' }, { status: 500 });
  }
}