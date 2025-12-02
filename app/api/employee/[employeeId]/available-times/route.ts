import { NextRequest, NextResponse } from 'next/server';
import api from '../../../../../bff/scheduleSystemApiConfig';

type employeeAvailableTimesResponse = {
  availableTimes: string[];
};

export async function GET(
  request: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  const { employeeId } = await params;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (typeof employeeId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid employee ID' },
      { status: 400 }
    );
  }

  try {
    const serviceDetailsResponse = await api.get<employeeAvailableTimesResponse>(`/employee-available-times-mock/${employeeId}`, {
      params: { date },
    });

    return NextResponse.json(serviceDetailsResponse.data);
  } catch (error) {
    // Lidar com erros da API principal
    return NextResponse.json({ message: 'Failed to fetch establishment data' }, { status: 500 });
  }
}