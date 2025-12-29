import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/Destination';
import { getCurrentUser } from '@/lib/auth';
import { destinationSchema } from '@/lib/validations';

// GET all destinations
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = req.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    
    const query: Record<string, unknown> = {};
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }
    
    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: destinations });
  } catch (error) {
    console.error('Get destinations error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

// POST create destination (protected)
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validation = destinationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.message },
        { status: 400 }
      );
    }

    await connectDB();
    const destination = await Destination.create(validation.data);

    return NextResponse.json(
      { success: true, data: destination },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create destination error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}