import{W as d,r as l,j as s,a as p}from"./app-3ca061b3.js";import{G as c}from"./GuestLayout-a7998561.js";import{I as u}from"./InputError-31e77835.js";import{I as f}from"./InputLabel-3a0bb58d.js";import{P as x}from"./PrimaryButton-96b80e4a.js";import{T as w}from"./TextInput-7d228aa4.js";function C(){const{data:a,setData:e,post:t,processing:o,errors:m,reset:n}=d({password:""});l.useEffect(()=>()=>{n("password")},[]);const i=r=>{r.preventDefault(),t(route("password.confirm"))};return s.jsxs(c,{children:[s.jsx(p,{title:"Confirm Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Esta es un área segura de la aplicación. Confirme su contraseña antes de continuar."}),s.jsxs("form",{onSubmit:i,children:[s.jsxs("div",{className:"mt-4",children:[s.jsx(f,{htmlFor:"password",value:"Password"}),s.jsx(w,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>e("password",r.target.value)}),s.jsx(u,{message:m.password,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(x,{className:"ml-4",disabled:o,children:"Confirmar"})})]})]})}export{C as default};