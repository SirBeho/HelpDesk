import{j as e}from"./app-7328f2b6.js";import{f as n}from"./index-af05e076.js";import"./typeof-7fd5df1e.js";function o({documentos_f:a,datos:s}){console.log(s);function i(l,r){const t=l.toString(),c=r-t.length;return c<=0?t:"0".repeat(c)+t}return e.jsxs("div",{className:"mx-10 bg-white p-5 rounded shadow-lg",children:[e.jsxs("div",{className:"text-center mb-10 relative w-full",children:[e.jsx("img",{src:"./assets/colorfullLogo.png",alt:"Logo",className:"w-1/6 absolute top-0 left-0"}),e.jsx("h1",{className:"text-2xl mt-3 [word-spacing:10px]",children:"  TESORIA SRL "}),e.jsx("h2",{children:"C/22A apto N1, Embrujo III, Santiago Rep. Dom."}),e.jsx("h2",{children:"RNC : 132706498   Tel.: 809-805-7566"})]}),e.jsx("table",{className:"min-w-full w-full leading-normal overflow-hidden  text-lg",children:e.jsxs("tbody",{className:" block w-full pb-5",children:[e.jsxs("tr",{className:"w-full flex ",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Reporte:"}),"SOL00456"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Usuario:"}),"Angel Polanco"]})]}),e.jsxs("tr",{className:"w-full flex",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Fecha:"}),(s==null?void 0:s.inicio)||"Inicio"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Fecha:"}),"06/11/2023"]})]}),e.jsxs("tr",{className:"w-full flex",children:[e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Hasta:"}),(s==null?void 0:s.fin)||"Actual"]}),e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium",children:"Hora:"}),"5:28:45 p.m."]})]}),s!=null&&s.cliente?e.jsx("tr",{className:"w-full flex",children:e.jsxs("td",{className:"flex w-1/2",children:[e.jsx("h1",{className:"w-20  font-medium ",children:"Cliente:"}),a[0].user.name]})}):null]})}),e.jsx("div",{className:" relative w-full h-14  mt-1 bg-gray-300 text-[35px] ",children:e.jsx("h1",{className:"absolute bottom-3 right-1/2 translate-x-1/2",children:"Reporte de Documentos"})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full",children:[e.jsx("thead",{className:"bg-darkblue text-white ",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"ID Documento"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Usuario"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Nombre"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Tipo Documento"}),e.jsx("th",{className:"px-5 py-3 border-b-2  text-left text-base font-semibold  uppercase tracking-wider",children:"Fecha"})]})}),e.jsxs("tbody",{children:[a&&a.map((l,r)=>e.jsxs("tr",{className:r%2===0?"bg-gray-100":"",children:[e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:i(l.id,4)}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:l.user.name}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:l.nombre}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:l.extencion}),e.jsx("td",{className:"px-6 py-4 whitespace-no-wrap",children:l.created_at&&n(new Date(l.created_at),"dd/MM/yyyy hh:mm:ss a")})]},r)),e.jsx("tr",{className:"bg-darkblue text-white",children:e.jsxs("td",{colSpan:"6",className:"py-2 font-semibold",children:["Total de documentos: ",(a==null?void 0:a.length)||0]})})]})]})})]})}export{o as default};
