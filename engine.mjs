export function initial(l){return{x:0,y:l.start,used:[],path:[[0,l.start]],stars:[],moves:[],status:'playing'}}
export function destination(l,s,i){const c=l.cards[i];if(!c||s.used.includes(i)||c.a2*s.x/2+c.b!==s.y)return null;const x=s.x+2,y=c.a2*x/2+c.b;return x<=l.end&&Number.isInteger(y)&&y>=-3&&y<=3?[x,y]:null}
export function choices(l,s){return l.cards.map((_,i)=>i).filter(i=>destination(l,s,i))}
export function step(l,s,i){if(s.status!=='playing')return s;const p=destination(l,s,i);if(!p)return s;const n={x:p[0],y:p[1],used:[...s.used,i],path:[...s.path,p],stars:[...s.stars],moves:[...s.moves,i],status:'playing'};l.stars.forEach((a,j)=>{if(a[0]===n.x&&a[1]===n.y)n.stars.push(j)});if(l.stars.some((a,j)=>a[0]<=n.x&&!n.stars.includes(j)))n.status='lost';else if(n.x===l.end)n.status=n.stars.length===l.stars.length?'won':'lost';else if(!choices(l,n).length)n.status='lost';return n}
export function restore(l,m=[]){return m.reduce((s,i)=>step(l,s,i),initial(l))}
export function solve(l,s=initial(l)){if(s.status==='won')return[];if(s.status==='lost')return null;for(const i of choices(l,s)){const p=solve(l,step(l,s,i));if(p)return[i,...p]}return null}
export function equation(c){const a=c.a2===2?'':c.a2===-2?'-':c.a2%2===0?String(c.a2/2):`${c.a2<0?'-':''}\\frac{${Math.abs(c.a2)}}{2}`;return `y=${a}x${c.b>0?'+'+c.b:c.b<0?c.b:''}`}
