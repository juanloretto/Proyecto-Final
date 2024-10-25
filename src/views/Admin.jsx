import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'


const Admin = ()=>{
    return(
    <Router>
        <Div>
            <Switch>
                <Route path="/" exact component={AdminDashboard} />
                {/*otras rutas pueden ser añadidas aqui */}
            </Switch>
        </Div>
    </Router>
  )
}

export default Admin
