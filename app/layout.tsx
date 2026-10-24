import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: '小林 響 | Hibiki Kobayashi — Engineer & Builder',
 description: '小林響のポートフォリオ。AI、信号処理、アプリケーション開発、国際交流、水球。',
 robots: {index:true,follow:true},
 openGraph:{title:'小林 響 | Hibiki Kobayashi',description:'考える。作る。挑戦する。',type:'website'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ja"><body>{children}</body></html>;}