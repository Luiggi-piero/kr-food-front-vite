import { Link } from 'react-router-dom';
import classes from './tags.module.css';

/**
 * Componente de categorías o etiquetas
 * @param {*} param0 categorías y boolean si la página de origen es food page
 * @returns 
 */
function Tags({ tags, forFoodPage }) {
    return (
        <div
            className={classes.container}
            style={{
                justifyContent: forFoodPage ? 'start' : 'center'
            }}
        >
            {
                tags?.map(tag => (
                    <Link key={tag.name} to={`/tag/${tag.name}`}>
                        {tag.name}
                        {!forFoodPage && ` (${tag.count})`}
                    </Link>
                ))
            }
        </div>
    )
}

export default Tags