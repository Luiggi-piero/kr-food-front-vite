import classes from './loading.module.css';
import { useLoading } from '../../hooks/useLoading.jsx';

function Loading() {

    const { isLoading } = useLoading();

    if (!isLoading) return;

    return (
        <div className={classes.container}>
            <span>Espere un momento por favor</span>
            <div className={classes.loader}></div>
        </div>
    )
}

export default Loading