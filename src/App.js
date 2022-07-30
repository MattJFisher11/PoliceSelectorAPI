import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Form from './components/form'
import React from "react"

function App() {


  return (
    <><div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Form></Form>
        </div>
      </div>
    </div>
    </>
   );
}

export default App;
