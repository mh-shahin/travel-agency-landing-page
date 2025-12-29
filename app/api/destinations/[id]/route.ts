import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/Destination';
import { getCurrentUser } from '@/lib/auth';
import { destinationSchema } from '@/lib/validations';

// GET single destination
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    const destination = await Destination.findById(id);

    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: destination });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
}

// PUT update destination (protected)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();

    const validation = destinationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.message },
        { status: 400 }
      );
    }

    await connectDB();
    const destination = await Destination.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: destination });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update destination' },
      { status: 500 }
    );
  }
}

// DELETE destination (protected)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    await connectDB();
    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: destination });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete destination' },
      { status: 500 }
    );
  }
}
