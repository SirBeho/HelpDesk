import{r as l,W as h,j as s}from"./app-3ca061b3.js";import{I as n}from"./InputError-31e77835.js";import{I as c}from"./InputLabel-3a0bb58d.js";import{P as g}from"./PrimaryButton-96b80e4a.js";import{T as d}from"./TextInput-7d228aa4.js";import{t as v}from"./transition-c2f24ee9.js";function b({className:m=""}){const p=l.useRef(),u=l.useRef(),{data:a,setData:e,errors:t,put:w,reset:o,processing:x,recentlySuccessful:f}=h({current_password:"",password:"",password_confirmation:""}),j=r=>{r.preventDefault(),w(route("password.update"),{preserveScroll:!0,onSuccess:()=>o(),onError:i=>{i.password&&(o("password","password_confirmation"),p.current.focus()),i.current_password&&(o("current_password"),u.current.focus())}})};return s.jsxs("section",{className:m,children:[s.jsxs("header",{children:[s.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Actualizar Contraseña"}),s.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Asegúrese de que su cuenta utilice una contraseña larga y aleatoria para mantenerse segura."})]}),s.jsxs("form",{onSubmit:j,className:"mt-6 space-y-6",children:[s.jsxs("div",{children:[s.jsx(c,{htmlFor:"current_password",value:"Current Password"}),s.jsx(d,{id:"current_password",ref:u,value:a.current_password,onChange:r=>e("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s.jsx(n,{message:t.current_password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(c,{htmlFor:"password",value:"New Password"}),s.jsx(d,{id:"password",ref:p,value:a.password,onChange:r=>e("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s.jsx(n,{message:t.password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(c,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(d,{id:"password_confirmation",value:a.password_confirmation,onChange:r=>e("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s.jsx(n,{message:t.password_confirmation,className:"mt-2"})]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(g,{disabled:x,children:"Guardar"}),s.jsx(v,{show:f,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:s.jsx("p",{className:"text-sm text-gray-600",children:"Guardado."})})]})]})]})}export{b as default};
