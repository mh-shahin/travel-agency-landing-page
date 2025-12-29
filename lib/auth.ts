// lib/auth.ts
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not set in environment variables!');
}

const getJwtSecret = () => {
  return new TextEncoder().encode(JWT_SECRET);
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function generateToken(userId: string, email: string): Promise<string> {
  const secret = getJwtSecret();
  
  const token = await new SignJWT({ userId, email, timestamp: Date.now() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
  
  return token;
}

export async function verifyToken(token: string): Promise<{ userId: string; email: string; timestamp: number; iat?: number; exp?: number } | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    console.log('✅ Token verified for user:', payload.email);
    return payload as { userId: string; email: string; timestamp: number; iat?: number; exp?: number };
  } catch (error) {
    console.error('❌ Token verification failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    console.log('✅ Auth cookie set successfully');
  } catch (error) {
    console.error('❌ Failed to set auth cookie:', error);
    throw error;
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (token) {
      console.log('✅ Auth token found');
    } else {
      console.log('❌ No auth token found');
    }
    
    return token;
  } catch (error) {
    console.error('❌ Failed to get auth token:', error);
    return undefined;
  }
}

export async function removeAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    console.log('✅ Auth cookie removed');
  } catch (error) {
    console.error('❌ Failed to remove auth cookie:', error);
  }
}

export async function getCurrentUser() {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      console.log('❌ No token found in getCurrentUser');
      return null;
    }
    
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      console.log('❌ Invalid token in getCurrentUser');
      return null;
    }
    
    console.log('✅ Current user:', decoded.email);
    return decoded;
  } catch (error) {
    console.error('❌ getCurrentUser error:', error);
    return null;
  }
}