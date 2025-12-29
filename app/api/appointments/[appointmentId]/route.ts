import api from "@/bff/scheduleSystemApiConfig";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  request: NextRequest,
  { params }: { params: { appointmentId: string } }
) {
  const { appointmentId } = await params;

  const userPhone = request.headers.get('user-phone');

  console.log('Deleting appointment with ID:', appointmentId, 'for user phone:', userPhone);

  // return NextResponse.json({ message: 'Appointment deletion not implemented yet' }, { status: 200 });
  try {
    await api.delete<void>(`/appointments/${appointmentId}`, {
      headers: {
        'user-phone': userPhone
      }
    });

    return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting appointment:', error);
    console.error('Error response data:', error.response.data);
    return NextResponse.json({ message: 'Failed to delete appointment' }, { status: 500 });
  }
}