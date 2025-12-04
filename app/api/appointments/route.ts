import { NextRequest, NextResponse } from 'next/server';
import api from '../../../bff/scheduleSystemApiConfig';

type employeeAvailableTimesResponse = {
  availableTimes: string[];
};

type appointmentData = {
  id: string,
  service: {
    id: string
    name: string
    durationInMinutes: number
    price: number
  },
  employee: {
    id: string 
    name: string
    imageUrl: string
  },
  appointmentDate: string
  appointmentTime: string
};

type appointmentResponse = {
  data: appointmentData[]
};


export async function GET(
  request: NextRequest
) {

  const userPhone = request.headers.get('user-phone');

  try {
    const response = await api.get<appointmentResponse>(`/appointments`, {
      headers: {
        'user-phone': userPhone
      }
    })

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ message: 'Failed to fetch appointments' }, { status: 500 });
  }
  
}

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