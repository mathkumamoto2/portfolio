import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
 try {
  const response=await fetch('https://api.github.com/users/mathkumamoto/events/public?per_page=10', {
    headers:{Accept:'application/vnd.github+json','User-Agent':'hibiki-portfolio'},
    next:{revalidate:600}
  });
  if(!response.ok) throw new Error(`GitHub status ${response.status}`);
  const events: Array<{type:string;created_at:string;repo:{name:string};payload?:{action?:string}}>=await response.json();
  const mapped=events.slice(0,5).map(e=>({type:e.type,repo:e.repo.name,at:e.created_at}));
  return NextResponse.json({events:mapped},{headers:{'Cache-Control':'public, s-maxage=600'}});
 }catch{return NextResponse.json({events:[],unavailable:true});}
}