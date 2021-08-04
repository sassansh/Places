import './Filters.css'

import { Col, Row, Input, Checkbox, Divider, Card } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const { Search } = Input

function Filters ({ setSearchQuery, checkedCriteria, setCheckedCriteria }) {
  const [allChecked, setAllChecked] = useState(true)
  const onSearch = (value) => setSearchQuery(value)
  const onChange = (value) => {
    if (value.length !== 0) {
      setCheckedCriteria(value)
      setAllChecked(false)
    }
  }
  const onChangeAll = (e) => {
    if (e.target.checked) {
      setCheckedCriteria([])
      setAllChecked(true)
    }
  }
  const categories = useSelector((state) => state.categories.allCategories)
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  )
  const currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  )
  const options = currentCategory.custom_criteria
  if (options.length !== 0) {
    return (
      <Col>
        <Card className='card'>
          <Row justify='center' align='middle'>
            <Col lg={18}>
              <Row justify='center' align='middle'>
                <Col lg={4} md={24} xs={22}>
                  <b>Rank Using:</b>
                </Col>
                <Col lg={20} md={24}>
                  <Checkbox
                    className='checkboxGroup'
                    onChange={onChangeAll}
                    checked={allChecked}
                  >
                    All
                  </Checkbox>
                  <Divider className='divider' type='vertical' />
                  <Checkbox.Group
                    className='checkboxGroup'
                    options={options}
                    value={checkedCriteria}
                    onChange={onChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row justify='center'>
                <Search
                  className='search'
                  placeholder='Search'
                  onSearch={onSearch}
                  enterButton
                  allowClear
                  style={{ width: 285 }}
                />
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    )
  } else {
    return (
      <Col>
        <Row justify='center' align='middle'>
          <Col lg={17} />
          <Col lg={7}>
            <Row justify='center'>
              <Search
                className='search'
                placeholder='Search'
                onSearch={onSearch}
                enterButton
                allowClear
                style={{ width: 285 }}
              />
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default Filters
