import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
//import Home from './components/pages/Home'
import Regions from './components/pages/Regions'
import Reports from './components/pages/Reports'
import ANFRedirect from './components/pages/ANFRedirect'
import Navbar from './components/navbar/Navbar'
import WaterOfficers from './components/pages/WaterOfficers'
import AddNewFile from './components/pages/AddNewFile'
import FileDetails from './components/pages/FileDetails'
import RegionalData from './components/regions/RegionData'
import { TrackerContextProvider } from './components/context/TrackerContext'

//temp work with omineca
//import Omineca from './components/regions/Omineca'

const App = () => {
    return (
        <TrackerContextProvider>
            <Router>
                <Navbar />
                <Switch>
                    <Route 
                        path='/' 
                        exact component={Regions} 
                    />
                    <Route 
                        path='/regions' 
                        exact component={Regions}  
                    />
                    <Route 
                        path='/region-data/:regionID/:active' 
                        component={RegionalData} 
                    />
                    <Route
                        path='/file-details/:regionID/:id'
                        component={FileDetails}
                    />
                    <Route 
                        path='/reports/:regionID' 
                        exact component={Reports} 
                    />
                    <Route 
                        path='/anf-redirect/:regionID' 
                        exact component={ANFRedirect} 
                    />
                    <Route 
                        path='/water-officers' 
                        exact component={WaterOfficers} 
                    />
                    <Route 
                        path='/add-new-file/:regionID' 
                        exact component={AddNewFile} 
                    />
                </Switch>
            </Router>
        </TrackerContextProvider>
    )
};

export default App;