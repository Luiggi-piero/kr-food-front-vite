import { Link } from 'react-router-dom';
import classes from './notFound.module.css';

function NotFound({ message = 'Nothing Found!', linkRoute = '/home', linkText = 'Go To Home Page' }) {
    return (
        <div className={classes.container}>
            {message}
            <Link to={linkRoute}>{linkText}</Link>
        </div>
    )
}

export default NotFound