import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { FoodItemDataGridItem } from '@/functions/swagger/GripFoodNextJs';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '@/types/Page';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'antd';
import Link from 'next/link';
import useSwr from 'swr';

// C- Create
// R- Read
// U- Update
// D- Delete

const RestaurantTableRow: React.FC<{
    restaurant: FoodItemDataGridItem,
}> = ({ restaurant }) => {


    return (
        <tr>
            <td className="border px-4 py-2">{restaurant.name}</td>
            <td className="border px-4 py-2">{restaurant.price}</td>
            <td className="border px-4 py-2">
                <Link href={`/restaurant`} className="inline-block py-1 px-2 text-xs bg-blue-500 text-white rounded-lg">
                    <FontAwesomeIcon className='mr-1' icon={faEye}></FontAwesomeIcon>
                    Checkout
                </Link>
            </td>
        </tr>
    );
};


const IndexPage: Page = () => {

    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr('/api/be/api/Restaurants?', swrFetcher);

    return (
        <div>
            <Title>View Restaurant</Title>
            <h2 className='mb-5 text-3xl'>View Restaurant</h2>
            {Boolean(error) && <Alert type='error' message='Cannot get Restaurant data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantTableRow key={i} restaurant={x}></RestaurantTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
