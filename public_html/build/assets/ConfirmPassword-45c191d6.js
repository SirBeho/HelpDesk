import{W as d,r as l,j as s,a as p}from"./app-e513ce89.js";import{G as c}from"./GuestLayout-cb037324.js";import{I as u}from"./InputError-e03e5562.js";import{I as f}from"./InputLabel-39a2b2f2.js";import{P as x}from"./PrimaryButton-722ff0be.js";import{T as w}from"./TextInput-7cdcb673.js";function C(){const{data:a,setData:e,post:t,processing:o,errors:m,reset:n}=d({password:""});l.useEffect(()=>()=>{n("password")},[]);const i=r=>{r.preventDefault(),t(route("password.confirm"))};return s.jsxs(c,{children:[s.jsx(p,{title:"Confirm Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Esta es un área segura de la aplicación. Confirme su contraseña antes de continuar."}),s.jsxs("form",{onSubmit:i,children:[s.jsxs("div",{className:"mt-4",children:[s.jsx(f,{htmlFor:"password",value:"Password"}),s.jsx(w,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>e("password",r.target.value)}),s.jsx(u,{message:m.password,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(x,{className:"ml-4",disabled:o,children:"Confirmar"})})]})]})}export{C as default};
