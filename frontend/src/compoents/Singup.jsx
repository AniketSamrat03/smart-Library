import React from 'react'
import  {Descope}  from '@descope/react-sdk'

function SignupForm(){
    return(
 <div>
<Descope
  flowId="sign-up-or-in"
  theme="light"
  redirectUrl="http://localhost:5173"
  redirectMode="redirect"
  onSuccess={(e) => {
    console.log("Success:", e);
  }}
  onError={(err) => {
    console.log("Error!", err);
  }}
/>

    </div>

    )
}


export default SignupForm