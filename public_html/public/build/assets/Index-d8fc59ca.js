import{W as o,j as e,a as r}from"./app-67a9b6ea.js";import{A as i}from"./AuthenticatedLayout-71ac0110.js";import"./transition-7475cba5.js";import"./Modal-c7427ea3.js";function h({auth:l,file:c,taskes:t}){const a=new Date,n=`${a.getDate()}/${a.getMonth()+1}/${a.getFullYear()}`;return o({email:"",password:"",remember:!1}),e.jsxs(i,{countNotificaciones:l.countNotificaciones,user:l.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Formulario subir doumentos"}),children:[e.jsx(r,{title:"Form"}),e.jsx("div",{className:"w-[calc(100%-3rem)] h-[calc(100%-3rem)] bg-[#f2f2f2] m-6 rounded-md flex flex-col gap-10 p-10",children:e.jsxs("form",{className:"flex flex-col w-2/5 gap-4 text-textgray",children:[e.jsxs("div",{className:"flex gap-4 ",children:[e.jsxs("label",{className:"text-xs flex flex-col ",children:["task",e.jsxs("select",{name:"services",id:"services",className:"h-9 rounded-md  outline-none px-2",children:[e.jsx("option",{value:"",children:"Seleccione servicio"}),t.map(s=>e.jsxs("option",{value:s.id,children:[s.numero,"-",s.tipo.nombre]},s.id))]})]}),e.jsxs("label",{htmlFor:"rnc",className:"text-xs flex flex-col ",children:["Fecha",e.jsx("input",{disabled:!0,type:"text",name:"date",value:n,className:"h-9 rounded-md w-3/5 outline-none px-2"})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"Nombre solicitante"}),e.jsx("input",{type:"text",name:"name",id:"name",value:l.user.name,className:"h-9 rounded-md w-4/5 outline-none px-2"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"phone",className:"text-xs",children:"Número contacto"}),e.jsx("input",{type:"text",name:"phone",id:"phone",value:l.user.telefono,className:"h-9 rounded-md w-3/5 outline-none px-2"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"email",className:"text-xs",children:"Correo electrónico"}),e.jsx("input",{type:"text",name:"email",id:"email",value:l.user.email,className:"h-9 rounded-md w-4/5 outline-none px-2"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"coment",className:"text-xs",children:"Descripcion"}),e.jsx("textarea",{placeholder:"Escribe tu descripcion",name:"coment",id:"coment",className:"w-full resize-none h-44 p-3 outline-none "})]}),e.jsx("button",{className:"border py-1 w-36 rounded-xl bg-gray-300 hover:bg-gray-200 text-textgray self-end justify-end mr-5 mt-5",children:"Enviar task"})]})})]})}export{h as default};
