import{j as e,W as d,a as m}from"./app-3ca061b3.js";import{f as c}from"./index-af05e076.js";import{A as n}from"./AuthenticatedLayout-61218ae5.js";import"./typeof-7fd5df1e.js";import"./transition-c2f24ee9.js";import"./Modal-8801e493.js";const x=({user:t,conf:r,emisor:a,mensaje:l,selectNotification:s,date:o})=>{const i=c(new Date(o),"dd/MM/yyyy hh:mm:ss a");return e.jsx("li",{onClick:s,className:"flex w-80 min-h-fit overflow-hidden bg-blue-500 rounded-md cursor-pointer",children:e.jsxs("div",{className:"flex flex-col gap-2 p-2 ms-2 text-textgray w-full bg-orange-100",children:[t.rol_id==2?e.jsx("span",{children:"Tesoria"}):e.jsxs("span",{children:["De: ",a]}),e.jsx("p",{className:"font-medium text-sm",children:l}),e.jsx("span",{className:"text-xs",children:i})]})})};function g({auth:t,notificaciones:r}){const{post:a}=d({}),l=(s,o)=>{a(route("notificaciones.update",{id:s,n_id:o}))};return e.jsxs(n,{countNotificaciones:t.countNotificaciones,user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Notificaciones"}),children:[e.jsx(m,{title:"Notificaciones"}),e.jsx("div",{className:"w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md overflow-y-auto",children:e.jsx("ul",{className:"flex flex-col gap-3 p-6",children:r!=null&&r.length?r.map(s=>e.jsx(x,{user:t.user,emisor:s.emisor,mensaje:s.mensaje,date:s.date,selectNotification:()=>l(s.solicitud_id,s.id),conf:!1},s.id)):e.jsx("h1",{children:"No hay Notificaciones"})})})]})}export{g as default};