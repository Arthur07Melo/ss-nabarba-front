import api from "@/http/scheduleSystemApiConfig";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  request: NextRequest,
  { params }: { params: { appointmentId: string } }
) {
  const { appointmentId } = params;

  const userPhone = request.headers.get('user-phone');

  console.log('Deleting appointment with ID:', appointmentId, 'for user phone:', userPhone);

  return NextResponse.json({ message: 'Appointment deletion not implemented yet' }, { status: 200 });
  // try {
  //   await api.delete(`/appointments/${appointmentId}`, {
  //     headers: {
  //       'user-phone': userPhone || ''
  //     }
  //   });

  //   NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 });
  // } catch (error) {
  //   console.error('Error deleting appointment:', error);
  //   NextResponse.json({ message: 'Failed to delete appointment' }, { status: 500 });
  // }
}