import{j as e}from"./app-11c91ab6.js";import{f as h}from"./index-af05e076.js";import"./typeof-7fd5df1e.js";function a({solicitudes_f:i,datos:l,empresa:c}){return console.log(c),e.jsxs("div",{className:" mx-10 bg-white ",children:[e.jsxs("div",{className:"text-center mb-10 relative w-full",children:[e.jsx("img",{src:"./assets/colorfullLogo.png",alt:"Logo",className:"w-1/6 absolute top-0 left-0"}),e.jsxs("h1",{className:"text-2xl mt-3 [word-spacing:10px]",children:[" ",c==null?void 0:c.empresa,"  "]}),e.jsxs("h2",{children:[c==null?void 0:c.direccion," "]}),e.jsxs("h2",{children:["RNC : ",c==null?void 0:c.RNC,"   Tel.: ",c==null?void 0:c.telefono," ",(c==null?void 0:c.telefono2)!=""&&` | ${c==null?void 0:c.telefono2}`]})]}),e.jsx("table",{className:"min-w-full w-full leading-normal overflow-hidden  text-lg",children:e.jsxs("tbody",{className:" block w-full pb-5",children:[e.jsxs("tr",{className:"w-full flex ",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Reporte:"}),"SOL00456"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Usuario:"}),l==null?void 0:l.usuario]})]}),e.jsxs("tr",{className:"w-full flex",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Desde:"}),l==null?void 0:l.inicio]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Fecha : "}),l==null?void 0:l.fecha]})]}),e.jsxs("tr",{className:"w-full flex",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Hasta:"}),l==null?void 0:l.fin]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Hora:"}),l==null?void 0:l.hora]})]}),e.jsxs("tr",{className:"w-full flex",children:[l!=null&&l.tipo?e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Tipo:"}),i[0].tipo.nombre]}):null,l!=null&&l.cliente?e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Cliente:"}),i[0].user.name]}):null,!(l!=null&&l.tipo&&(l!=null&&l.cliente))&&(l!=null&&l.estado)?e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Estado:"}),i[0].status.nombre]}):null]}),l!=null&&l.tipo&&(l!=null&&l.cliente)&&(l!=null&&l.estado)?e.jsx("tr",{children:e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Estado de solicitud:"}),i[0].status.nombre]})}):null]})}),e.jsx("div",{className:" relative w-full h-14  mt-1 bg-gray-300 text-[35px] ",children:e.jsx("h1",{className:"absolute bottom-3 right-1/2 translate-x-1/2",children:"Reporte de Solicitudes"})}),e.jsxs("table",{className:"min-w-full w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-darkblue   text-left",children:[e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"#Solicitud"}),e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"Tipo"}),e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"Cliente"}),e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"RNC"}),e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"Fecha"}),e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"Status"}),e.jsx("th",{className:"pb-3 text-white uppercase tracking-wider",children:"Correo"})]})}),e.jsxs("tbody",{children:[i&&i.map((n,s)=>e.jsxs("tr",{className:s%2===0?"bg-gray-100":"bg-white",children:[e.jsx("td",{className:"pb-4 pt-2 h-fit whitespace-no-wrap",children:n.numero}),e.jsx("td",{className:"pb-4 pt-2 whitespace-no-wrap",children:n.tipo.nombre}),e.jsx("td",{className:"pb-4 pt-2 whitespace-no-wrap",children:n.user.name}),e.jsx("td",{className:"pb-4 pt-2 whitespace-no-wrap",children:n.user.rnc}),e.jsx("td",{className:"pb-4 pt-2 whitespace-no-wrap",children:h(new Date(n.created_at),"dd/MM/yyyy hh:mm:ss a")}),e.jsx("td",{className:" whitespace-no-wrap",children:n.status.nombre}),e.jsx("td",{className:" whitespace-no-wrap",children:n.user.email})]},s)),e.jsx("tr",{className:"bg-gray-300 mt-2 text-black ",children:e.jsxs("td",{className:"pb-4 ",children:["Total de Solicitudes: ",(i==null?void 0:i.length)||0]})})]})]})]})}export{a as default};
