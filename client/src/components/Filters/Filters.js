import "./Filters.css";

import { Col, Row, Input, Checkbox, Divider, Card } from "antd";
import { useState } from 'react';

const { Search } = Input;

function Filters({ setSearchQuery }) {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [allChecked, setAllChecked] = useState(true);
  const onSearch = (value) => setSearchQuery(value);
  const onChange = (value) => {
    if (value.length !== 0) {
      setCheckedOptions(value);
      setAllChecked(false);
    }
  } 
  const onChangeAll = (e) => {
    if (e.target.checked) {
      setCheckedOptions([]);
      setAllChecked(true);
    }
  };
  const options = ["Fun", "Noise", "Sand Softness", "Water Quality", "Parking"];
  return (
    <Col>
      <Card className="card">
        <Row justify="center" align="middle">
          <Col lg={18}>
            <Row justify="center" align="middle">
              <Col lg={4} md={24} xs={22}>
                <b>Rank Using:</b>
              </Col>
              <Col lg={20} md={24}>
                <Checkbox className="checkboxGroup" onChange={onChangeAll} checked={allChecked}>
                  All
                </Checkbox>
                <Divider className="divider" type="vertical"></Divider>
                <Checkbox.Group
                  className="checkboxGroup"
                  options={options}
                  value={checkedOptions}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Row justify="center">
              <Search
                className="search"
                placeholder="Search"
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
  );
}

export default Filters;
