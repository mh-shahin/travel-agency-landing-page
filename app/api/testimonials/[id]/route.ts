import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { getCurrentUser } from '@/lib/auth';
import { testimonialSchema } from '@/lib/validations';

// GET single testimonial
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

// PUT update testimonial (protected)
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

    const validation = testimonialSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.message },
        { status: 400 }
      );
    }

    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE testimonial (protected)
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
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
