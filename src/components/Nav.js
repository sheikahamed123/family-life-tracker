import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHome, BiStar, BiCalendar, BiUser, BiReceipt, BiLogOut } from 'react-icons/bi';
import { toggleLogin } from '../features/login/loginSlice';
import { useDispatch } from 'react-redux';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <BiHome />,
        to: '/',
        section: ''
    },
    {
        display: 'Getting Started',
        icon: <BiStar />,
        to: '/started',
        section: 'started'
    },
    {
        display: 'Calendar',
        icon: <BiCalendar />,
        to: '/calendar',
        section: 'calendar'
    },
    {
        display: 'User',
        icon: <BiUser />,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Orders',
        icon: <BiReceipt />,
        to: '/order',
        section: 'order'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    const handleLogout = () => {
        // Dispatch the toggleLogin action with payload false to indicate logout
        dispatch(toggleLogin(false));
    };

    return (
        <div className='fixed top-0 left-0 bottom-0 w-64 bg-white rounded-r-lg shadow-md flex flex-col justify-between'>
            <div>
                <div className="sidebar__logo text-center pt-4 text-2xl">
                    Family Hub
                </div>
                <div ref={sidebarRef} className="sidebar__menu">
                    <div
                        ref={indicatorRef}
                        className="sidebar__menu__indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                        }}
                    ></div>
                    {sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''} flex items-center justify-start px-6 py-4 text-lg font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-white hover:bg-purple-300 ${activeIndex === index ? 'bg-purple-300 text-white' : ''} rounded-md`}>
                                <div className="sidebar__menu__item__icon mr-4 text-xl">
                                    {item.icon}
                                </div>
                                <div className="sidebar__menu__item__text">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* Logout Button */}
            <div className="px-6 py-4 text-lg font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-white hover:bg-red-500 rounded-md">
                <button onClick={handleLogout} className="flex items-center justify-start">
                    <div className="sidebar__menu__item__icon mr-4 text-xl text-red-500">
                        <BiLogOut />
                    </div>
                    <div className="sidebar__menu__item__text">
                        Logout
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
