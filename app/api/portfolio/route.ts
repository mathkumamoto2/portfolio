import { NextResponse } from 'next/server';
import data from '../../../lib/portfolio.json';
export const dynamic = 'force-dynamic';
export async function GET() {return NextResponse.json({...data, retrievedAt: new Date().toISOString()}, {headers:{'Cache-Control':'no-store'}});}
