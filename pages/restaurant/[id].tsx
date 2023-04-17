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

const FoodItemTableRow: React.FC<{
    foodItem: FoodItemDataGridItem,
}> = ({ foodItem }) => {


    return (
        <tr>
            <td className="border px-4 py-2">{foodItem.name}</td>
            <td className="border px-4 py-2">{foodItem.price}</td>
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
    const { data, error } = useSwr('/api/be/api/FoodItems', swrFetcher);

    return (
        <div>
            <Title>View Restaurant Menu</Title>
            <h2 className='mb-5 text-3xl'>View Restaurant Menu</h2>
            <Link href='/' className="text-blue-500 hover:text-blue-700 transition-colors duration-300">Return to Restaurant</Link>
            {Boolean(error) && <Alert type='error' message='Cannot get Restaurant data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <FoodItemTableRow key={i} foodItem={x}></FoodItemTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
