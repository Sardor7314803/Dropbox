import './App.css'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import { Button } from '@aws-amplify/ui-react';
import awsExports from './Configuration';




Amplify.configure(awsExports);

function Auth() {


   return (
    <Authenticator>
      {/* {({ signOut, user }) => {
        console.log("user", user)
        console.log("signOut", signOut)
        return(
          <main>
            <div className='header'>
              <h2>Dropbox</h2>
              <Button variation="primary" onClick={signOut} className="btn">Sign out</Button>
            </div>
        </main>
      )}} */}
    </Authenticator>
  );
}

export default Auth;