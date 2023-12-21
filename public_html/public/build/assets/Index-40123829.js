import{r as l,W as w,j as e,a as N,d as S}from"./app-3ca061b3.js";import{A as y}from"./AuthenticatedLayout-61218ae5.js";import{M as k}from"./Modal-8801e493.js";import"./transition-c2f24ee9.js";function z({auth:c,datos:o,msj:t}){const[u,a]=l.useState(o),[h,g]=l.useState(t!=null);l.useEffect(()=>{g((t==null?void 0:t.success)!=null)},[t]);const[i,d]=l.useState(0),{data:n,setData:x,post:p,processing:C,errors:E,reset:_}=w({tipo_id:"",descripcion:""}),r=s=>{if(i==s)d(0),a(o);else{d(s);const m=o.filter(v=>v.tipo===s);a(m)}},f=s=>{s.preventDefault(),p(route("task.create"))},b=()=>{window.location.reload()};return e.jsxs(y,{countNotificaciones:c.countNotificaciones,user:c.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"taskes"}),children:[e.jsx(N,{title:"taskes"}),e.jsxs(k,{show:h,maxWidth:"sm",onClose:b,children:[e.jsx("img",{className:"z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  ",src:"/assets/svg/check.svg",alt:""}),e.jsxs("div",{className:"text-center relative mb-2 ",children:[e.jsx("h1",{className:"mt-14 mb-8 font-semibold",children:(t==null?void 0:t.success)||(t==null?void 0:t.error)}),(t==null?void 0:t.success)&&e.jsx("div",{className:"hover:scale-110",children:e.jsx(S,{href:route("admtaskes",{id:t.id}),className:"bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  ",children:"Ver"})})]})]}),e.jsxs("div",{className:"w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 py-4",children:[e.jsxs("ul",{className:"flex gap-10 p-6 w-fit mx-auto",children:[e.jsxs("li",{onClick:()=>r(1),className:`cursor-pointer flex items-center gap-3 p-3 w-52 border-2 bg-blue-500 ${i==1?"border-black":""} rounded-md text-white font-semibold text-lg `,children:[e.jsx("img",{src:"/assets/svg/export.svg",width:40,height:40,alt:"Servicios"}),"Servicios"]}),e.jsxs("li",{onClick:()=>r(2),className:` cursor-pointer flex items-center gap-3 p-3 w-52 border-2 bg-yellow-500 ${i==2?"border-black":""} rounded-md text-white font-semibold text-lg `,children:[e.jsx("img",{src:"/assets/svg/document.svg",width:40,height:40,alt:"icon documento"}),"Certificaciones"]}),e.jsxs("li",{onClick:()=>r(3),className:`cursor-pointer flex items-center gap-3 p-3 w-52 border-2 bg-cyan-500 ${i==3?"border-black":""} rounded-md text-white font-semibold text-lg filter`,children:[e.jsx("img",{src:"/assets/svg/board.svg",width:40,height:40,alt:"Icon board"}),"Estados Financieros"]}),e.jsxs("li",{onClick:()=>r(4),className:`cursor-pointer flex items-center gap-3 p-3 w-52 border-2 bg-blue-800 ${i==4?"border-black":""} rounded-md text-white font-semibold text-lg`,children:[e.jsx("img",{src:"/assets/svg/database.svg",width:40,height:40,alt:"icon database"}),"Reportes Generales"]})]}),e.jsxs("form",{onSubmit:f,className:"flex flex-col mx-24   gap-4 text-textgray",children:[e.jsxs("label",{className:"flex items-center gap-3",children:[e.jsx("span",{className:" text-xl w-60 ",children:" Seleccione servicio"}),e.jsxs("select",{required:!0,value:n.tipo_id,onChange:s=>x("tipo_id",s.target.value),name:"tipo_id",id:"tipo_id",className:" p-3 w-full bg-white rounded-md outline-none",children:[e.jsx("option",{defaultValue:"",children:"Ningun sercicio seleccionado"}),u.map(s=>e.jsx("option",{value:s.id,children:s.nombre},s.id))]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"descripcion",className:" text-xl",children:"Favor detalle su task:"}),e.jsx("textarea",{required:!0,placeholder:"Escribe tu descripcion",name:"descripcion",id:"descripcion",value:n.descripcion,onChange:s=>x("descripcion",s.target.value),className:"w-full resize-none h-44 p-3 outline-none mt-2"})]}),(t==null?void 0:t.error)??e.jsx("div",{children:t==null?void 0:t.error}),e.jsx("button",{className:"border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5",children:"Enviar task"})]})]})]})}export{z as default};
