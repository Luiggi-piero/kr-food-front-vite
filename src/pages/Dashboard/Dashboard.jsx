import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import classes from './dashboard.module.css';

function Dashboard() {

    const { user } = useAuth();

    return (
        <div className={classes.container}>
            <div className={classes.menu}>
                {
                    allItems
                        .filter(item => user.isAdmin || !item.forAdmin)
                        .map(item => (
                            <Link
                                key={item.title}
                                to={item.url}
                                style={{
                                    color: item.color
                                }}
                            >
                                <img src={item.imageUrl} alt={item.title} />
                                <h2>{item.title}</h2>
                            </Link>
                        ))
                }
            </div>
        </div>
    )
};

const allItems = [
    {
        title: 'Orders',
        imageUrl: '/icons/orders.svg',
        url: '/orders',
        bgColor: '#ec407a',
        color: 'black',
    },
    {
        title: 'Profile',
        imageUrl: '/icons/profile.svg',
        url: '/profile',
        bgColor: '#1565c0',
        color: 'black',
    },
    {
        title: 'Users',
        imageUrl: '/icons/users.svg',
        url: '/admin/users',
        forAdmin: true,
        bgColor: '#00bfa5',
        color: 'black',
    },
    {
        title: 'Foods',
        imageUrl: '/icons/foods.svg',
        url: '/admin/foods',
        forAdmin: true,
        bgColor: '#e040fb',
        color: 'black',
    },
];

export default Dashboard;