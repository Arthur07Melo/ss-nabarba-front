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
  console.log(establishmentId)

  if (typeof establishmentId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid establishment ID' },
      { status: 400 }
    );
  }

  try {
    // Faz as chamadas para a API principal a partir do servidor
    const establishmentServiceResponse = await api.get<establishmentServicesResponse>(`/establishment-services-mock/${establishmentId}`); // Esta chamada está correta

    return NextResponse.json(establishmentServiceResponse.data);
  } catch (error) {
    // Lidar com erros da API principal
    return NextResponse.json({ message: 'Failed to fetch establishment data' }, { status: 500 });
  }
}