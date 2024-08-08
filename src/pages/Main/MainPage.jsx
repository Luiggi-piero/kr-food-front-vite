import classes from './mainPage.module.css';

function MainPage() {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h3 className={classes.title}>KR Food</h3>
                <p className={classes.description}>
                    The corner of the only flavor
                </p>
            </div>
        </div>
    )
}

export default MainPage