import{j as e}from"./app-c3352f24.js";import{f as x}from"./index-af05e076.js";import"./typeof-7fd5df1e.js";function o({documentos_f:t,datos:l,empresa:s}){function n(c,i){const r=c.toString(),a=i-r.length;return a<=0?r:"0".repeat(a)+r}return e.jsxs("div",{className:"mx-10 bg-white p-5 rounded shadow-lg",children:[e.jsxs("div",{className:"text-center mb-10 relative w-full",children:[e.jsx("img",{src:"./assets/colorfullLogo.png",alt:"Logo",className:"w-1/6 absolute top-0 left-0"}),e.jsxs("h1",{className:"text-2xl mt-3 [word-spacing:10px]",children:[" ",s==null?void 0:s.empresa,"  "]}),e.jsxs("h2",{children:[s==null?void 0:s.direccion," "]}),e.jsxs("h2",{children:["RNC : ",s==null?void 0:s.RNC,"   Tel.: ",s==null?void 0:s.telefono," ",(s==null?void 0:s.telefono2)!=""&&` | ${s==null?void 0:s.telefono2}`]})]}),e.jsx("table",{className:"min-w-full w-full leading-normal overflow-hidden  text-lg",children:e.jsxs("tbody",{className:" block w-full pb-5",children:[e.jsxs("tr",{className:"w-full flex ",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Reporte:"}),"SOL00456"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Usuario:"}),l==null?void 0:l.usuario]})]}),e.jsxs("tr",{className:"w-full flex",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Fecha:"}),(l==null?void 0:l.inicio)||"Inicio"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Fecha :"}),l==null?void 0:l.fecha]})]}),e.jsxs("tr",{className:"w-full flex",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Hasta:"}),(l==null?void 0:l.fin)||"Actual"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Hora:"}),l==null?void 0:l.hora]})]}),l!=null&&l.cliente?e.jsx("tr",{className:"w-full flex",children:e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Cliente:"}),t[0].user.name]})}):null]})}),e.jsx("div",{className:" relative w-full h-14  mt-1 bg-gray-300 text-[35px] ",children:e.jsx("h1",{className:"absolute bottom-3 right-1/2 translate-x-1/2",children:"Reporte de Documentos"})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full",children:[e.jsx("thead",{className:"bg-darkblue text-white ",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"ID Documento"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Usuario"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"name"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Tipo Documento"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Fecha"})]})}),e.jsxs("tbody",{children:[t&&t.map((c,i)=>e.jsxs("tr",{className:i%2===0?"bg-gray-100":"",children:[e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:n(c.id,4)}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:c.user.name}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:c.name}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:c.extencion}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:c.created_at&&x(new Date(c.created_at),"dd/MM/yyyy hh:mm:ss a")})]},i)),e.jsx("tr",{className:"bg-darkblue text-white",children:e.jsxs("td",{colSpan:"6",className:"py-2 font-semibold",children:["Total de documentos: ",(t==null?void 0:t.length)||0]})})]})]})})]})}export{o as default};
