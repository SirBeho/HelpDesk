import{j as e,W as d,r as x,a as u,d as h}from"./app-67a9b6ea.js";import{G as f}from"./GuestLayout-7ba5b148.js";import{I as i}from"./InputError-40bbf51c.js";import"./TextInput-cade62a6.js";function p({className:t="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+t})}function v({status:t,canResetPassword:a}){const{data:r,setData:l,post:o,processing:b,errors:n,reset:m}=d({email:"",password:"",remember:!1});x.useEffect(()=>()=>{m("password")},[]);const c=s=>{s.preventDefault(),o(route("login"))};return e.jsxs(f,{children:[e.jsx(u,{title:"Log in"}),t&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),e.jsxs("div",{className:"w-9/12 h-4/5 bg-softgray grid grid-cols-2 p-10",children:[e.jsxs("div",{className:"flex flex-col justify-center p-20",children:[e.jsx("h1",{className:"text-darkblue font-bold text-3xl px-5",children:"Bienvenidos a Task Assignment Online"}),e.jsx("p",{className:"text-textgray w-96 p-5",children:"Tu destino en linea para hacer negocios con Task Assignment"}),e.jsx("a",{className:"ms-5 hover:underline",href:"https://Task Assignment.online/",children:"← Ir a Task Assignment"})]}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("form",{onSubmit:c,className:"bg-offwhite flex flex-col w-fit h-fit p-8",children:[e.jsx("h2",{className:"text-darkblue font-bold text-3xl px-5 text-center py-8",children:"Login"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"text-sm text-darkblue font-medium",children:"Correo"}),e.jsx("input",{type:"email",id:"email",name:"email",value:r.email,onChange:s=>l("email",s.target.value),className:"border-2 w-80 h-9 outline-none mb-6 block"}),e.jsx(i,{message:n.email,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"pass",className:"text-sm text-darkblue font-medium",children:"contraseña"}),e.jsx("input",{type:"password",id:"password",name:"password",value:r.password,onChange:s=>l("password",s.target.value),className:"border-2 w-80 h-9 outline-none mb-6 block"}),e.jsx(i,{message:n.password,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(p,{name:"remember",checked:r.remember,onChange:s=>l("remember",s.target.checked)}),e.jsx("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsx("button",{type:"submit",className:"h-9 w-full  bg-softblue mt-5 text-white font-bold text-xl",children:"INGRESAR"}),e.jsx("div",{className:"flex justify-between text-xs text-darkblue font-medium",children:a&&e.jsx(h,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"¿Olvidaste tu contraseña?"})})]})})]})]})}export{v as default};
