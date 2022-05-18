import Login from "./Login";
import Register from "./Register";
import ErrorForm from "../Error/ErrorForm";
function Index(props) {
    return (
        <div>
            {<Login />}
            <div className="col-sm-1">
                <h2 className="or">OR</h2>
            </div>
            {<Register />}
        </div>
    );
}

export default Index;