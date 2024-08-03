import { BrowserRouter, Route, Routes as Switch, Navigate} from "react-router-dom";
import { Dashboard, Login } from "../pages";


export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>
                
                <Route path="*" element={<Navigate to="/"/>}/>
            </Switch>
        </BrowserRouter>
    );
};