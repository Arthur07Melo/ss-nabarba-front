import { NextRequest, NextResponse } from 'next/server';
import api from '../../../../bff/scheduleSystemApiConfig';


type establishmentServicesResponse = {
  establishment: establishmentDataResponse;
  services: serviceDataResponse[];
}

type establishmentDataResponse = {
  id: string;
  name: string;
};

type serviceDataResponse = {
  id: string;
  name: string;
  price: number;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { establishmentId: string } }
) {
  const { establishmentId } = await params;

  console.log(`[Request: /api/establishment/${establishmentId}] Starting processing request`);

  if (typeof establishmentId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid establishment ID' },
      { status: 400 }
    );
  }

  try {
    // const establishmentServiceResponse = await api.get<establishmentServicesResponse>(`/establishment-services-mock/${establishmentId}`);

    const establishmentServiceResponse = await api.get<establishmentServicesResponse>(`/establishment/${establishmentId}/service`);

    return NextResponse.json(establishmentServiceResponse.data);
  } catch (error: any) {

    return NextResponse.json({ message: 'Failed to fetch establishment data' }, { status: 500 });
  }
}