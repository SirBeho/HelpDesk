import{W as n,j as e,a as c}from"./app-3ca061b3.js";import{G as d}from"./GuestLayout-a7998561.js";import{I as u}from"./InputError-31e77835.js";import{P as x}from"./PrimaryButton-96b80e4a.js";import{T as p}from"./TextInput-7d228aa4.js";function h({status:a}){const{data:t,setData:r,post:i,processing:m,errors:o}=n({email:""}),l=s=>{s.preventDefault(),i(route("password.email"))};return e.jsxs(d,{children:[e.jsx(c,{title:"Forgot Password"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"¿Olvidaste tu contraseña? Simplemente escriba su dirección de correo electrónico y le enviaremos un enlace de reinicio de contraseña que le permitirá crear una nueva."}),a&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),e.jsxs("form",{onSubmit:l,children:[e.jsx(p,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",isFocused:!0,onChange:s=>r("email",s.target.value)}),e.jsx(u,{message:o.email,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-end mt-4",children:e.jsx(x,{className:"ml-4",disabled:m,children:"Solicitar"})})]})]})}export{h as default};
