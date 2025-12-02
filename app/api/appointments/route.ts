import { NextRequest, NextResponse } from 'next/server';
import api from '../../../bff/scheduleSystemApiConfig';

type employeeAvailableTimesResponse = {
  availableTimes: string[];
};

export async function POST(
  request: NextRequest
) {
  const {
    userPhone,
    userName,
    serviceId,
    employeeId,
    appointmentDate
  } = await request.json()

  try {
    const appointmentsResponse = await api.post<void>(`/appointments`, {
      userPhone,
      userName,
      serviceId,
      employeeId,
      appointmentDate
    });

    return NextResponse.json(appointmentsResponse.data);
  } catch (error) {
    console.error('Error posting appointment:', error);
    return NextResponse.json({ message: 'Failed to fetch establishment data' }, { status: 500 });
  }
}