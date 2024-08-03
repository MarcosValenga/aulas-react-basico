import { BrowserRouter, Route, Routes as Switch, Navigate} from "react-router-dom";
import { Dashboard } from "../pages";


export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Dashboard/>}/>
                
                <Route path="*" element={<Navigate to="/"/>}/>
            </Switch>
        </BrowserRouter>
    );
};