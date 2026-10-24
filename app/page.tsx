"use client";
import Image from "next/image";
import {useEffect,useMemo,useState} from "react";
import seed from "../lib/portfolio.json";

type Category="Engineering"|"Research"|"Product"|"Leadership"|"Award"|"Sport";
type Entry={id:string;title:string;org:string;date:string;order:number;category:Category;summary:string;url:string;linkLabel:string;note:string};
type Project={id:string;number:string;type:string;title:string;subtitle:string;description:string;url:string;linkLabel:string;status:string};
type GithubEvent={type:string;repo:string;at:string};
const categories: Array<"All"|Category>=["All","Engineering","Research","Product","Leadership","Award","Sport"];
const categoryNames:Record<string,string>={All:"すべて",Engineering:"開発",Research:"研究",Product:"プロダクト",Leadership:"国際・運営",Award:"受賞",Sport:"スポーツ"};
const initials=seed.achievements as Entry[];
const firstProjects=seed.projects as Project[];
const link=(url:string)=>/^https:\/\//.test(url)?url:"#";

export default function Home(){
 const [entries,setEntries]=useState<Entry[]>(initials);
 const [projects,setProjects]=useState<Project[]>(firstProjects);
 const [active,setActive]=useState<"All"|Category>("All");
 const [query,setQuery]=useState("");
 const [sort,setSort]=useState<"latest"|"earliest">("latest");
 const [selected,setSelected]=useState<Entry|null>(null);
 const [progress,setProgress]=useState(0);
 const [events,setEvents]=useState<GithubEvent[]>([]);
 useEffect(()=>{
   const controller=new AbortController();
   fetch('/api/portfolio',{cache:'no-store',signal:controller.signal}).then(r=>r.ok?r.json():null).then(data=>{if(data?.achievements){setEntries(data.achievements);setProjects(data.projects);}}).catch(()=>{});
   fetch('/api/github',{signal:controller.signal}).then(r=>r.ok?r.json():null).then(data=>{if(data?.events)setEvents(data.events);}).catch(()=>{});
   const onScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max:0)};
   onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
   return()=>{controller.abort();window.removeEventListener('scroll',onScroll)};
 },[]);
 useEffect(()=>{if(!selected)return;const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setSelected(null)};window.addEventListener('keydown',escape);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',escape);document.body.style.overflow=''}} ,[selected]);
 const visible=useMemo(()=>entries.filter(a=>active==='All'||a.category===active).filter(a=>[a.title,a.org,a.summary,a.date].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase())).sort((a,b)=>sort==='latest'?b.order-a.order:a.order-b.order),[entries,active,query,sort]);
 return <main id="top">
  <div className="read-progress" style={{transform:`scaleX(${progress})`}}/>
  <header className="header"><a className="wordmark" href="#top">Hibiki<span className="dot">.</span></a><nav aria-label="主なナビゲーション"><a href="#about">About</a><a href="#projects">Projects</a><a href="#timeline">Experience</a><a href="#contact">Contact</a></nav><a className="nav-link" href="https://github.com/mathkumamoto" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></header>
  <section className="hero" id="about">
    <div className="hero-inner">
      <div className="hero-left"><div className="overline"><span className="overline-dot"/>PORTFOLIO / 2026</div><p className="mini">HIBIKI KOBAYASHI — KUMAMOTO UNIVERSITY</p><h1>考える。<br/>作る。<br/><span>挑戦する。</span></h1><p className="hero-intro">AI・信号処理・アプリケーション開発。技術を研究室の中だけで終わらせず、誰かの課題を解決できる形へ。競技にも開発にも、同じ探究心で向き合う。</p><div className="hero-cta"><a className="btn btn-primary" href="#projects">開発しているものを見る <span>↗</span></a><a className="btn btn-ghost" href="#timeline">活動実績を見る <span>↓</span></a></div><div className="hero-detail"><div><span>FIELD</span><strong>AI / APPLICATION</strong></div><div><span>ACADEMIC</span><strong>熊本大学・工学部</strong></div><div><span>GPA</span><strong>3.47</strong></div></div></div>
      <div className="hero-photo-wrap"><div className="photo-number">FIG. 01 <span>— curiosity in action</span></div><div className="photo-actual"><Image src="/portrait.webp" alt="本人写真。屋外で彫刻の隣に立っている" fill priority sizes="(max-width: 840px) 95vw, 43vw" className="hero-photo" /></div><div className="photo-footer"><span>STUDENT / ENGINEER / BUILDER</span><span>JAPAN · 2026</span></div></div>
    </div>
    <div className="hero-marquee"><span>CURIOUS BY NATURE</span><span className="separator">✳</span><span>ENGINEERING BY PRACTICE</span><span className="separator">✳</span><span>BETTER THROUGH CHALLENGES</span></div>
  </section>

  <section className="now-section shell" id="now"><div className="section-topline"><span>01 / IN PROGRESS</span><span className="right-note">現在取り組んでいること</span></div><div className="now-title"><div><p className="eyebrow">CURRENT FOCUS</p><h2>いま、つくっているもの。</h2></div><p>関心を増やすだけではなく、動くプロダクトと再現できる成果へ。</p></div><div className="now-grid"><a className="now-card" href="https://venture.kuma-u.jp/program/entrepreneurship/yumepro/" target="_blank" rel="noreferrer"><div className="now-card-top"><span className="status"><i/>開発中</span><span>01 ↗</span></div><div className="now-art now-art-grid"><span className="now-art-symbol">⌁</span><span className="art-tag">EDTECH</span></div><h3>早解きコロシアム</h3><p>熊本大学「夢プロジェクト」で開発中。解く楽しさを、学びのエネルギーに変える。</p><span className="card-link">夢プロジェクト公式サイト ↗</span></a><a className="now-card" href="https://mitouteki-kumamoto.com/" target="_blank" rel="noreferrer"><div className="now-card-top"><span className="status"><i/>研究開発中</span><span>02 ↗</span></div><div className="now-art now-art-wave"><div className="wave-lines">∿∿∿</div><span className="art-tag">SENSING × AI</span></div><h3>Digital Olfaction Interface</h3><p>複数センサーとAIによる、生活臭の検知・解析・可視化。IPPO採択プロジェクト。</p><span className="card-link">IPPO公式サイト ↗</span></a></div></section>

  <section className="work-section shell" id="projects"><div className="section-topline"><span>02 / SELECTED PROJECTS</span><span className="right-note">研究と実装</span></div><div className="section-title-row"><h2>Works <em>&</em> experiments.</h2><p>大きな構想を、小さく実装し、計測し、改善する。</p></div><div className="projects-list">{projects.map(p=><a key={p.id} className="project-row" href={link(p.url)} target="_blank" rel="noreferrer"><div className="project-number">{p.number}</div><div className="project-main"><div className="project-type">{p.type} / {p.status}</div><h3>{p.title}</h3><h4>{p.subtitle}</h4><p>{p.description}</p></div><div className="project-go"><span>View related site</span><b>↗</b></div></a>)}</div></section>

  <section className="timeline-section" id="timeline"><div className="shell"><div className="section-topline"><span>03 / EXPERIENCE & ACHIEVEMENTS</span><span className="right-note">活動・受賞・国際交流・競技</span></div><div className="section-title-row"><h2>歩んできたこと。</h2><p>所属や肩書だけではなく、何に取り組んできたかを記録する。</p></div>
   <div className="highlight-grid"><button className="highlight" type="button" onClick={()=>setSelected(entries.find(x=>x.id==='joc')??null)}><span className="highlight-label">SPORT / NATIONAL</span><strong>全国<span className="highlight-number">2</span>位</strong><span className="highlight-bottom">第40回 JOCジュニアオリンピックカップ<br/>水球競技 準優勝　↗</span></button><button className="highlight" type="button" onClick={()=>setSelected(entries.find(x=>x.id==='sojo')??null)}><span className="highlight-label">AWARD / BUSINESS</span><strong>審査員<span className="highlight-award">特別賞</span></strong><span className="highlight-bottom">崇城大学 ビジネスプランコンテスト<br/>早解きコロシアム　↗</span></button><a className="highlight" href="https://jasciec.jp/77th/schedule/" target="_blank" rel="noreferrer"><span className="highlight-label">LEADERSHIP / INTERNATIONAL</span><strong>日米<span className="highlight-award">学生会議</span></strong><span className="highlight-bottom">第77回 熊本サイト実行委員<br/>熊本での国際交流活動　↗</span></a></div>
   <div className="filter-panel"><div className="filter-heading"><h3>実績一覧 <span>{visible.length} / {entries.length}</span></h3><div className="filter-actions"><label className="search"><span>⌕</span><input aria-label="活動を検索" value={query} placeholder="キーワードで検索" onChange={e=>setQuery(e.target.value)}/></label><button className="sort-btn" type="button" onClick={()=>setSort(sort==='latest'?'earliest':'latest')}>{sort==='latest'?'新しい順 ↓':'古い順 ↑'}</button></div></div><div className="tabs" role="group" aria-label="実績カテゴリー">{categories.map(x=><button type="button" key={x} aria-pressed={x===active} className={x===active?'chosen':''} onClick={()=>setActive(x)}>{categoryNames[x]}{x!=='All'?<small>{entries.filter(e=>e.category===x).length}</small>:null}</button>)}</div></div>
   <div className="entries">{visible.map(e=><article className="experience-row" key={e.id}><div className="experience-date">{e.date}</div><div className="experience-body"><p className="entry-category">{categoryNames[e.category]}</p><h3>{e.title}</h3><p className="experience-org">{e.org}</p><p className="experience-summary">{e.summary}</p></div><div className="experience-actions"><button type="button" onClick={()=>setSelected(e)} aria-label={`${e.title}の詳細を見る`}>詳細 <span>＋</span></button><a href={link(e.url)} target="_blank" rel="noreferrer">{e.linkLabel} ↗</a></div></article>)}{visible.length===0&&<div className="empty">該当する活動がありません。検索条件を変更してください。</div>}</div>
  </div></section>

  <section className="values shell"><div className="section-topline"><span>04 / PERSONAL PRINCIPLES</span><span className="right-note">競技も、研究も、開発も。</span></div><div className="values-layout"><h2>好奇心を<br/><span>行動に変える。</span></h2><div><p>水球で学んだチームワーク。国際学生会議での運営。研究室やインターンでの実装。異なる経験が、ものづくりの視野を広げてくれた。</p><p>私が大切にしているのは、理論を理解したうえで、実際に動くものをつくり、確かめること。</p><div className="value-pills"><span>Build</span><span>Measure</span><span>Learn</span><span>Repeat</span></div></div></div></section>

  <section className="github-section shell"><div className="section-topline"><span>05 / OPEN SOURCE & CODE</span><span className="right-note">GitHub 公開アクティビティ</span></div><div className="github-panel"><div><p className="eyebrow">GITHUB / mathkumamoto</p><h2>コードで、残す。</h2><p>公開リポジトリと直近の活動はGitHubから取得します。非公開の開発は表示されません。</p><a href="https://github.com/mathkumamoto" target="_blank" rel="noreferrer" className="text-link">GitHubを見る ↗</a></div><div className="github-events">{events.length?events.map((e,i)=><div className="github-event" key={`${e.repo}-${e.at}-${i}`}><span className="repo-name">{e.repo}</span><time>{new Date(e.at).toLocaleDateString('ja-JP')}</time></div>):<p>公開アクティビティがないか、取得できませんでした。GitHubプロフィールから確認できます。</p>}</div></div></section>

  <footer id="contact"><div className="shell footer-inner"><div><p className="eyebrow">CONTACT</p><h2>一緒に、<br/>面白いものを。</h2><p>研究・ソフトウェア開発・新しいプロダクトについて。</p></div><div className="footer-right"><a href="mailto:g4105@st.cs.kumamoto-u.ac.jp">Email <span>↗</span></a><a href="https://github.com/mathkumamoto" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href="#top">Back to top <span>↑</span></a></div><div className="footer-bottom"><span>© 2026 Hibiki Kobayashi</span><span>Designed for a curious mind. Made to evolve.</span></div></div></footer>

 {selected&&<div className="modal-backdrop" role="presentation" onClick={()=>setSelected(null)}><section role="dialog" aria-modal="true" aria-label={`${selected.title}の詳細`} className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><span>{categoryNames[selected.category]} / {selected.date}</span><button type="button" aria-label="詳細を閉じる" onClick={()=>setSelected(null)}>✕</button></div><h2>{selected.title}</h2><h3>{selected.org}</h3><p>{selected.summary}</p>{selected.note&&<div className="modal-note">{selected.note}</div>}<a href={link(selected.url)} target="_blank" rel="noreferrer" className="modal-cta">{selected.linkLabel} ↗</a></section></div>}
 </main>;
}