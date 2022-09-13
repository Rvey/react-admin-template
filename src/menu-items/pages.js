// assets
import { IconChartBar } from '@tabler/icons';

// constant
const icons = {
    IconChartBar
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'Statistics',
    title: 'Statistics',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'Leads',
            title: 'Leads',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'Posts',
                    title: 'posts',
                    type: 'item',
                    url: '/posts',
                    target: false
                },
                {
                    id: 'Users',
                    title: 'Leads Management',
                    type: 'item',
                    url: '/users',
                    target: false
                }
            ]
        }
    ]
};

export default pages;
// const MyHook = () => {
//     const resources = useResourceDefinitions();
//     // use effect for example if you need to run something at state updates

//     return resources; // returning state and setState you can use them by your component
// };
// const extraPages = MyHook();
// console.log('extrapage', extraPages);
