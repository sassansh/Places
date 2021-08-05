import './Category.css';

import { Avatar, Card } from 'antd';

import { Link } from 'react-router-dom';
import { setCurrentCategory } from '../../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';

function Category ({ category }) {
  const dispatch = useDispatch();

  return (
    <Link
      to='/categoryview'
      onClick={() => {
        dispatch(setCurrentCategory(category.category_id));
      }}
    >
      <Card style={{ margin: 16 }}>
        <span className='category'>
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {category.emoji}
          </Avatar>
          <span className='category-name'>{category.name}</span>
        </span>

        <span className='num-of-places'>{category.numPlaces} Places</span>
      </Card>
    </Link>
  );
}

export default Category;
