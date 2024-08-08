import { Link } from 'react-router-dom';
import classes from './mainPage.module.css';

function MainPage() {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h3 className={classes.title}>KR Food</h3>
                <p className={classes.description}>
                    The corner of the only flavor
                </p>
                <Link to='/home' className={classes.btn_view_products}>
                    View Products
                </Link>
            </div>
        </div>
    )
}

export default MainPage