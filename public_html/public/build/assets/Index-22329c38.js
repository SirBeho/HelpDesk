import{r as x,W as R,j as e,a as L}from"./app-3ca061b3.js";import{A as W}from"./AuthenticatedLayout-61218ae5.js";import{M as E}from"./Modal-8801e493.js";import"./transition-c2f24ee9.js";function X({auth:n,msj:o,clientes:u}){const _=n.user.solicitudes.filter(s=>s.tipo_id<3);_.sort((s,t)=>new Date(s.created_at)-new Date(t.created_at));const[a,$]=x.useState(n.user),p=_.reduce((s,t)=>{const l=new Date(t.created_at).getFullYear();return t.tipo_id===1&&t.user_id==(a==null?void 0:a.id)?(s.tipo1[l]=s.tipo1[l]||[],s.tipo1[l].push(t)):t.tipo_id===2&&t.user_id==(a==null?void 0:a.id)&&(s.tipo2[l]=s.tipo2[l]||[],s.tipo2[l].push(t)),s},{tipo1:{},tipo2:{}}),[j,m]=x.useState(null),[A,f]=x.useState(!1),[M,g]=x.useState(o!=null),[v,C]=x.useState(0),[w,k]=x.useState(0),[N,y]=x.useState(0),{data:d,setData:h,post:O,processing:U,errors:V,reset:G}=R({tipo_id:0,descripcion:"",created_at:"",year:new Date().getFullYear().toString(),month:""}),z=s=>{const t=u.find(l=>l.id==s);$(t)},q=()=>{let t=new Date().getFullYear()-2,l=[];for(let c=0;c<5;c++)l.push(t+c);return l},S=s=>{v==s?C(0):C(s)},D=s=>{const t=s.id,l=s.nombre+"."+s.extencion;axios.post("/download",{id:t},{responseType:"blob"}).then(c=>{const i=window.URL.createObjectURL(new Blob([c.data])),r=document.createElement("a");r.href=i,r.setAttribute("download",l),document.body.appendChild(r),r.click()}).catch(c=>{console.error("Error al descargar el archivo:",c)})};x.useEffect(()=>{o&&o.errord?m("Ya existe un bloque para este mes del "+d.year):o&&o.error?m(typeof o.error=="string"?o.error:null):o&&!o.error&&(m(o.success),g(!0),h("month",""))},[o]);const Y=s=>{s.preventDefault(),O(route("solicitud.create"))},B=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];x.useEffect(()=>{h({...d,descripcion:B[d.month-1]+" "+d.year,created_at:d.year+"-"+d.month+"-02"})},[d.month]);const F=s=>{w==s?k(0):k(s),y(0)};return e.jsxs(W,{solicitud_id:N,msj:o,countNotificaciones:n.countNotificaciones,user:n.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Panel de documentos"}),children:[e.jsx(L,{title:"Panel"}),e.jsx("div",{className:"pb-1",children:e.jsxs("div",{className:"bg-white shadow-md h-full mx-5 rounded-md p-2 mt-3 mb-3",children:[n.user.rol_id!=2?e.jsxs("label",{className:"flex w-1/2  m-6 items-center",children:[e.jsx("span",{className:"flex items-center whitespace-nowrap  w-fit h-12 px-2",children:"Seleccione un cliente"}),e.jsxs("select",{value:a==null?void 0:a.id,onChange:s=>z(s.target.value),className:"w-[calc(100%-3rem)]   rounded-md  h-12   outline-none px-2",children:[e.jsx("option",{value:"0",children:"Seleccione el cliente"}),u==null?void 0:u.map(s=>e.jsxs("option",{value:s.id,children:[s.name," - ",s.email]},s.id))]})]}):null,(a==null?void 0:a.rol_id)==2&&n.user.rol_id!=2?e.jsxs("div",{className:" m-6 mt-0 border-2 w-fit border-black rounded-md p-1  flex gap-2 ",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center ",children:[e.jsx("div",{className:"font-bold w-44 py-2",children:"Nombre solicitante"}),e.jsx("div",{children:a.name})]}),e.jsxs("div",{className:"flex items-center ",children:[e.jsx("div",{className:"font-bold w-44 py-2",children:"Nombre empresa"}),e.jsx("div",{children:a.empresa})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center ",children:[e.jsx("div",{className:"font-bold w-44 py-2",children:"Télefono"}),e.jsx("div",{children:a.telefono})]}),e.jsxs("div",{className:"flex items-center ",children:[e.jsx("div",{className:"font-bold w-44 py-2",children:"RNC"}),e.jsx("div",{children:a.rnc})]})]}),e.jsx("tr",{className:"w-fit"}),e.jsx("tr",{className:"w-fit"})]}):null,e.jsxs("div",{className:"w-[calc(100%-3rem)] h-[calc(100%-3rem)] flex gap-4  m-6 rounded-md  mb-2",children:[e.jsxs("div",{className:"h-full w-full bg-[#f2f2f2]",children:[e.jsxs("h3",{className:"w-full bg-[#1ec0e6] p-2 font-bold text-white rounded-t-md text-xl flex justify-between",children:["Facturas de costos/gastos",n.user.rol_id==2?e.jsx("button",{htmlFor:"file",onClick:()=>{f(!0),h("tipo_id",1)},className:"flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-base text-white cursor-pointer",children:"Crear Bloque +"}):e.jsx("h1",{className:"h-9 px-2 gap-2  items-center "})]}),e.jsx("div",{className:"flex flex-col h-5/6 overflow-hidden ",children:Object.keys(p.tipo1).sort((s,t)=>new Date(t)-new Date(s)).map((s,t)=>e.jsxs("table",{className:"w-full text-left text-textgray",children:[e.jsx("thead",{onClick:()=>F("1"+s),children:e.jsx("tr",{className:"border-2 text-sm h-8 bg-gray-300",children:e.jsxs("th",{className:"p-2",children:["Facturas ",s," "]})})}),e.jsx("div",{className:`block overflow-auto duration-500  transition-all ${w=="1"+s?"h-[400px]":"h-0"}  `,children:p.tipo1[s].map((l,c)=>{var i;return e.jsxs("div",{children:[e.jsxs("div",{onClick:()=>y(l.id),className:"cursor-pointer flex justify-between",children:[e.jsxs("div",{className:"p-2 h-10",children:[l.descripcion," (",(i=l.files)==null?void 0:i.length,")"]}),n.user.rol_id==2&&e.jsx("div",{className:"p-2 h-10",children:e.jsx("label",{htmlFor:"file",className:"bg-upload px-2 py-1 rounded-lg font-semibold text-white",children:" + "})})]}),e.jsx("div",{className:` bg-white ms-5 rounded-sm p-1 flex duration-1000 transition-all ${N==l.id?"":"hidden "}`,children:l.files?l.files.map(r=>{const b=n.user.rol_id==1||n.user.id==r.user.id;return e.jsxs("div",{onClick:()=>S(r.id),className:"text-center w-16 group relative cursor-pointer",children:[e.jsxs("div",{className:"w-12 relative",children:[e.jsx("img",{className:"w-full",src:`/assets/svg/${r.extencion}.svg`,alt:"",onError:J=>J.target.src="/assets/svg/file3.svg"}),r.confidencial?e.jsx("img",{src:"/assets/confidencial.png",className:`absolute top-0 ${b&&"w-1/2"} `,alt:""}):null,v==r.id&&(!r.confidencial||b)?e.jsx("img",{onClick:()=>D(r),src:"/assets/svg/descargar.svg",alt:"",className:"z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 "}):null]}),e.jsx("span",{className:"text-sm left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10",children:r.nombre})]},r.id)}):e.jsx("div",{children:"No hay facturas subidas"})})]},l.id)})},"t1"+s)]},"t1"+t))})]}),e.jsxs("div",{className:"h-full w-full bg-[#f2f2f2]",children:[e.jsxs("h3",{className:"w-full bg-[#1e85e6] p-2 font-bold text-white rounded-t-md text-xl flex justify-between",children:["Facturas de Ventas",n.user.rol_id==2?e.jsx("button",{htmlFor:"file",onClick:()=>{f(!0),h("tipo_id",2)},className:"flex h-9 px-2 gap-2 bg-upload items-center rounded-lg text-base text-white cursor-pointer",children:"Crear Bloque +"}):e.jsx("h1",{className:"h-9 px-2 gap-2  items-center "})]}),e.jsx("div",{className:"flex flex-col h-5/6 overflow-hidden ",children:Object.keys(p.tipo2).sort((s,t)=>new Date(t)-new Date(s)).map((s,t)=>e.jsxs("table",{className:"w-full text-left text-textgray",children:[e.jsx("thead",{onClick:()=>F("2"+s),children:e.jsx("tr",{className:"border-2 text-sm h-8 bg-gray-300",children:e.jsxs("th",{className:"p-2",children:["Facturas ",s," "]})})}),e.jsx("div",{className:`block overflow-auto duration-500  transition-all ${w=="2"+s?"h-[400px]":"h-0"}  `,children:p.tipo2[s].map(l=>{var c;return e.jsxs("div",{children:[e.jsxs("div",{onClick:()=>y(l.id),className:"cursor-pointer flex justify-between",children:[e.jsxs("div",{className:"p-2 h-10",children:[l.descripcion," (",(c=l.files)==null?void 0:c.length,")"]}),n.user.rol_id==2&&e.jsx("div",{className:"p-2 h-10",children:e.jsx("label",{htmlFor:"file",className:"bg-upload px-2 py-1 rounded-lg font-semibold text-white",children:" + "})})]}),e.jsx("div",{className:` bg-white ms-5 rounded-sm p-1 flex duration-1000 transition-all ${N==l.id?"":"hidden "}`,children:l.files?l.files.map(i=>{const r=n.user.rol_id==1||n.user.id==i.user.id;return e.jsxs("div",{onClick:()=>S(i.id),className:"text-center w-16 group relative cursor-pointer",children:[e.jsxs("div",{className:"w-12 relative",children:[e.jsx("img",{className:"w-full",src:`/assets/svg/${i.extencion}.svg`,alt:"",onError:b=>b.target.src="/assets/svg/file3.svg"}),i.confidencial?e.jsx("img",{src:"/assets/confidencial.png",className:`absolute top-0 ${r&&"w-1/2"} `,alt:""}):null,v==i.id&&(!i.confidencial||r)?e.jsx("img",{onClick:()=>D(i),src:"/assets/svg/descargar.svg",alt:"",className:"z-20 top-10 left-14 w-8 absolute transform -translate-x-1/2 hover:scale-125 "}):null]}),e.jsx("span",{className:"text-sm left-1/2 transform -translate-x-1/2  relative overflow-hidden text-ellipsis whitespace-nowrap rounded-md block w-16 group-hover:bg-gray-200 group-hover:px-1 group-hover:overflow-visible group-hover:w-fit group-hover:z-10",children:i.nombre})]},i.id)}):e.jsx("div",{children:"No hay facturas subidas"})})]},l.id)})},"tb2"+s)]},"t2"+t))})]})]})]})}),e.jsxs(E,{show:A,onClose:()=>{f(!1),m(null)},maxWidth:"md",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:()=>{f(!1),m(null)},className:"px-2 font-bold hover:bg-gray-300 rounded-lg",children:"x"})}),e.jsxs("form",{onSubmit:Y,className:"flex flex-col w-full  text-textgray ",children:[e.jsx("h1",{className:"text-xl text-center font-bold",children:"Bloque Para facturas"}),e.jsx("h1",{className:"text-xl text-center font-bold mb-5",children:d.tipo_id==1?"Compras":"ventas"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("label",{className:"text-base flex flex-col w-2/3",children:[e.jsx("span",{className:"whitespace-nowrap",children:"Seleccione el mes "}),e.jsxs("select",{required:!0,name:"month",id:"month",value:d.month,onChange:s=>h("month",s.target.value),className:"h-9 rounded-md outline-none px-2",children:[e.jsx("option",{value:"",disabled:!0}),e.jsx("option",{value:"01",children:"Enero"}),e.jsx("option",{value:"02",children:"Febrero"}),e.jsx("option",{value:"03",children:"Marzo"}),e.jsx("option",{value:"04",children:"Abril"}),e.jsx("option",{value:"05",children:"Mayo"}),e.jsx("option",{value:"06",children:"Junio"}),e.jsx("option",{value:"07",children:"Julio"}),e.jsx("option",{value:"08",children:"Agosto"}),e.jsx("option",{value:"09",children:"Septiembre"}),e.jsx("option",{value:"10",children:"Octubre"}),e.jsx("option",{value:"11",children:"Noviembre"}),e.jsx("option",{value:"12",children:"Diciembre"})]})]}),e.jsxs("label",{className:"text-base flex flex-col w-fit",children:[e.jsx("span",{className:"whitespace-nowrap",children:"Seleccione el Año "}),e.jsxs("select",{required:!0,name:"year",id:"year",value:d.year,onChange:s=>h("year",s.target.value),className:"h-9  rounded-md outline-none px-2",children:[e.jsx("option",{value:"",disabled:!0}),q().map(s=>e.jsx("option",{value:s,children:s},s))]})]})]}),j&&e.jsx("div",{className:"alert alert-danger",children:j}),e.jsx("button",{className:`border py-1 w-36 rounded-xl ${d.tipo_id==1?"bg-[#1ec0e6]":"bg-[#1e85e6]"}  hover:bg-gray-200 text-white self-center justify-center mr-5 mt-8`,children:"Crear"})]})]}),e.jsxs(E,{show:M,maxWidth:"sm",onClose:()=>{g(!1),m(null)},children:[e.jsx("img",{className:"z-50 w-20 absolute left-1/2 transform -translate-x-1/2 -top-10 bg-white rounded-full p-2  ",src:"/assets/svg/check.svg",alt:""}),e.jsxs("div",{className:"text-center relative mb-2 ",children:[e.jsx("h1",{className:"mt-14 mb-8 font-semibold",children:j}),e.jsx("div",{className:"hover:scale-110",children:e.jsx("button",{onClick:()=>{g(!1),m(null)},className:"bg-green-600 rounded-lg px-3 py-1     text-lg font-bold text-white  ",children:"Cerrar"})})]})]})]})}export{X as default};
