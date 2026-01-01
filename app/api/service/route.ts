import { NextRequest, NextResponse } from 'next/server';
import api from '../../../bff/scheduleSystemApiConfig';


export async function GET(
  request: NextRequest
) {
  const establishmentAccessToken = request.headers.get('Authorization');  

  try {
    const response = await api.get('/service', {
      headers: {
        'Authorization': establishmentAccessToken || ''
      }
    })

    console.log('Services fetched successfully:', response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest
) {
  const establishmentAccessToken = request.headers.get('Authorization');  
  const { searchParams } = new URL(request.url);
  const serviceIds = searchParams.getAll('serviceId');

  try {
    const response = await api.delete('/service', {
      headers: {
        'Authorization': establishmentAccessToken || ''
      },
      params: {
        serviceIds: serviceIds
      }
    })

    console.log('Services deleted successfully:', serviceIds);

    return NextResponse.json({ message: 'Services deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting services:', error);
    return NextResponse.json({ message: 'Failed to delete services' }, { status: 500 });
  }
}