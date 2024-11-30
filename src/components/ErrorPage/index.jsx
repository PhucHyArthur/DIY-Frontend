import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div>
            <div>
                Error Page
            </div>
            <Link to={"/owner"}>
                <button className="btn btn-outline">Go home</button>
            </Link>
        </div>
    )
}

export default ErrorPage

