import{j as e,r as o,W as D,a as G}from"./app-7328f2b6.js";import{A as J,L as K}from"./AuthenticatedLayout-d9818f8f.js";import{M as p}from"./Modal-c879149f.js";import{D as O}from"./DeleteUser-4f6f7879.js";import"./transition-2f2ce9ea.js";function P({roles:x,setData:r,isCliente:u,data:t,submit:i,changeRol:c,hideModal:h,msj:n}){return e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:i,className:"flex flex-col gap-4 text-textgray",children:[e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-3/5",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"Nombre Completo"}),e.jsx("input",{type:"text",name:"name",id:"name",className:"h-9 rounded-md w-full outline-none",value:t.name,required:!0,onChange:l=>r("name",l.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsx("label",{htmlFor:"telefono",className:"text-xs",children:"Número contacto"}),e.jsx("input",{type:"tel",name:"telefono",id:"telefono",className:"h-9 rounded-md full outline-none px-2",value:t.telefono,required:!0,onChange:l=>r("telefono",l.target.value)})]})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-3/5",children:[e.jsx("label",{htmlFor:"email",className:"text-xs",children:"Correo electrónico"}),e.jsx("input",{type:"email",name:"email",id:"email",className:"h-9 rounded-md w-full outline-none px-2",value:t.email,required:!0,onChange:l=>r("email",l.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsx("label",{htmlFor:"email",className:"text-xs",children:"Asignar Rol"}),e.jsxs("select",{name:"rol_id",id:"rol_id",className:"w-full p-1 bg-white rounded-md outline-none",onChange:c,required:!0,children:[e.jsx("option",{value:"",children:"Seleccione Rol"}),x.map(l=>e.jsx("option",{value:l.id,children:l.nombre},l.id))]})]})]}),u&&e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-2/4",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"Empresa"}),e.jsx("input",{type:"text",name:"name",id:"name",className:"h-9 rounded-md outline-none px-2",onChange:l=>r("empresa",l.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/4",children:[e.jsx("label",{htmlFor:"rnc",className:"text-xs",children:"RNC"}),e.jsx("input",{type:"text",name:"rnc",id:"rnc",className:"h-9 rounded-md outline-none px-2",onChange:l=>r("rnc",l.target.value)})]})]}),(n==null?void 0:n.error)&&e.jsx("span",{className:"text-red-500 text-xs italic",children:n==null?void 0:n.error[0]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{className:"border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5",type:"button",onClick:h,children:"Cancelar"}),e.jsx("button",{type:"submit",className:"border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5",children:"Registrar"})]})]})})}function Q({roles:x,changeRol:r,hideModal:u,update:t,selectedUser:i,setData:c,isCliente:h,msj:n,data:l}){return e.jsxs(e.Fragment,{children:[e.jsxs("form",{onSubmit:t,className:"flex flex-col gap-4 text-textgray",children:[e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-3/5",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"Nombre Completo"}),e.jsx("input",{type:"text",name:"name",id:"name",className:"h-9 rounded-md w-full outline-none",value:l.name||i.name,required:!0,onChange:a=>c("name",a.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/5",children:[e.jsx("label",{htmlFor:"telefono",className:"text-xs",children:"Número contacto"}),e.jsx("input",{type:"tel",name:"telefono",id:"telefono",className:"h-9 rounded-md full outline-none px-2",value:l.telefono||i.telefono,required:!0,onChange:a=>c("telefono",a.target.value)})]})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-2/4",children:[e.jsx("label",{htmlFor:"rol_id",className:"text-xs",children:"Asignar Rol"}),e.jsxs("select",{name:"rol_id",id:"rol_id",className:"w-full p-1 bg-white rounded-md outline-none",defaultValue:i.rol_id,onChange:r,children:[e.jsx("option",{value:"",children:"Seleccione Rol"}),x.map(a=>e.jsx("option",{value:a.id,children:a.nombre},a.id))]})]}),e.jsxs("div",{className:"flex flex-col w-2/4",children:[e.jsx("label",{htmlFor:"status",className:"text-xs",children:"Seleccionar Status"}),e.jsxs("select",{name:"status",id:"status",className:"w-full p-1 bg-white rounded-md outline-none",defaultValue:i.status,onChange:a=>c("status",a.target.value),children:[e.jsx("option",{value:"",children:"Selecionar Estado"}),e.jsx("option",{value:1,children:"Activo"}),e.jsx("option",{value:0,children:"Inactivo"})]})]})]})]}),h&&e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col w-2/4",children:[e.jsx("label",{htmlFor:"name",className:"text-xs",children:"Empresa"}),e.jsx("input",{type:"text",name:"name",id:"name",className:"h-9 rounded-md outline-none px-2",value:l.empresa||i.empresa,onChange:a=>c("empresa",a.target.value)})]}),e.jsxs("div",{className:"flex flex-col w-2/4",children:[e.jsx("label",{htmlFor:"rnc",className:"text-xs",children:"RNC"}),e.jsx("input",{type:"text",name:"rnc",id:"rnc",className:"h-9 rounded-md outline-none px-2",value:l.rnc||i.rnc,onChange:a=>c("rnc",a.target.value)})]})]}),(n==null?void 0:n.error)&&e.jsx("span",{className:"text-red-500 text-xs italic",children:n==null?void 0:n.error[0]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"button",className:"border py-1 w-36 rounded-xl bg-red-500 hover:bg-red-400 text-offwhite q mr-5 mt-5",onClick:u,children:"Cancelar"}),e.jsx("button",{type:"submit",className:"border py-1 w-36 rounded-xl bg-blue-500 hover:bg-blue-600 text-offwhite self-end justify-end mr-5 mt-5",children:"Registrar"})]})]})}function ee({auth:x,users:r,roles:u,msj:t}){console.log(typeof t);const[i,c]=o.useState(r),[h,n]=o.useState(""),[l,a]=o.useState({}),[C,v]=o.useState(),[R,N]=o.useState(!1),[S,j]=o.useState(!1),[U,g]=o.useState(!1),[_,m]=o.useState(!1),[A,k]=o.useState({}),[M,w]=o.useState(t!=null);o.useEffect(()=>{w((t==null?void 0:t.success)!=null),g((t==null?void 0:t.error)!=null),k(t)},[t]);const{data:L,setData:b,post:y,reset:F}=D({name:null,email:null,telefono:null,rnc:null,empresa:null,rol_id:null,status:null}),E=s=>{let d=s.target.value;b("rol_id",s.target.value),d==2?v(!0):v(!1)},q=s=>{const d=r.filter(f=>f.id===s);N(!0),a(d[0]),b("rol_id",d[0].rol_id)},V=s=>{const d=r.filter(f=>f.id===s);j(!0),a(d[0])};function z(s){s=s.toLowerCase(),n(s);const d=r.filter(f=>f.name.toLowerCase().includes(s));c(d)}const B=s=>{s.preventDefault(),g(!1),m(!0),y(route("register"),{onSuccess:()=>{m(!1)}})},W=()=>{g(!0)},H=s=>{s.preventDefault(),N(!1),m(!0),y(route("usuario.update",l.id),{onSuccess:()=>{m(!1),a({})}})},I=s=>{s.preventDefault(),j(!1),m(!0),y(route("usuario.delete",l.id),{onSuccess:()=>{m(!1),a({}),c(r)}})};return o.useEffect(()=>{c(r)},[r]),o.useEffect(()=>()=>{F("password","password_confirmation")},[]),o.useEffect(()=>{v(l.rol_id==2)},[l]),e.jsxs(J,{countNotificaciones:x.countNotificaciones,user:x.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Usuarios"}),children:[e.jsx(G,{title:"Usuarios"}),e.jsx(p,{show:U,children:e.jsx(P,{msj:A,roles:u,setData:b,isCliente:C,data:L,submit:B,changeRol:E,hideModal:()=>{g(!1),F(),k({})}})}),e.jsx(p,{show:R,children:e.jsx(Q,{data:L,roles:u,isCliente:C,msj:t,changeRol:E,hideModal:()=>N(!1),update:H,setData:b,selectedUser:l})}),e.jsx(p,{show:S,children:e.jsx(O,{deleteUser:S,hideModal:()=>j(!1),destroy:I,selectedUser:l})}),e.jsx(p,{show:_,children:e.jsx(K,{})}),e.jsxs(p,{show:M,maxWidth:"sm",onClose:()=>w(!1),children:[e.jsx("img",{className:"z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  ",src:"/assets/svg/check.svg",alt:""}),e.jsxs("div",{className:"text-center relative mb-2 ",children:[e.jsx("h1",{className:"mt-14 mb-8 font-semibold",children:(t==null?void 0:t.success)||(t==null?void 0:t.error)}),e.jsx("div",{className:"hover:scale-110",children:e.jsx("button",{onClick:()=>w(!1),className:"bg-green-600 rounded-lg px-3 py-1 text-lg font-bold text-white  ",children:"Cerrar"})})]})]}),e.jsx("div",{className:"container mx-auto px-4 sm:px-8",children:e.jsxs("div",{className:"py-8",children:[e.jsxs("div",{className:"my-2 flex sm:flex-row flex-col gap-4 items-center",children:[e.jsxs("div",{className:"block relative",children:[e.jsx("span",{className:"h-full absolute inset-y-0 left-0 flex items-center pl-2",children:e.jsx("svg",{viewBox:"0 0 24 24",className:"h-4 w-4 fill-current text-gray-500",children:e.jsx("path",{d:"M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"})})}),e.jsx("input",{placeholder:"Buscar usuario",className:"appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",value:h,onChange:s=>z(s.target.value)})]}),e.jsx("div",{children:e.jsx("button",{className:"bg-blue-600 rounded-sm h-9 px-2 hover:bg-blue-700 hover:shadow-md  text-gray-950 hover:text-gray-100",onClick:W,children:"Nuevo usuario"})})]}),e.jsx("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto",children:e.jsx("div",{className:"inline-block min-w-full shadow rounded-lg overflow-hidden",children:e.jsxs("table",{className:"min-w-full leading-normal overflow-hidden",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"Usuario"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"Rol"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"Status"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"Actions"})]})}),e.jsx("tbody",{children:i&&i.map((s,d)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-3 border-b border-gray-200 bg-white text-base font-medium",children:s.name}),e.jsx("td",{className:"px-5 py-3 border-b border-gray-200 bg-white text-sm",children:e.jsx("p",{className:"text-gray-900 whitespace-no-wrap",children:s.rol.nombre})}),e.jsx("td",{className:"px-5 py-3 border-b border-gray-200 bg-white text-sm",children:s.status==0?e.jsx("span",{className:"bg-red-300 px-2 rounded-lg",children:"Inactivo"}):e.jsx("span",{className:"bg-blue-300 px-2 rounded-lg",children:"Activo"})}),e.jsx("td",{className:"px-5 py-3 border-b border-gray-200 bg-white text-sm",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("span",{className:"cursor-pointer",onClick:()=>{q(s.id)},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 hover:stroke-blue-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})})}),e.jsx("span",{className:"cursor-pointer",onClick:()=>{V(s.id)},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 hover:stroke-red-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})]})})]},d))})]})})})]})})]})}export{ee as default};
