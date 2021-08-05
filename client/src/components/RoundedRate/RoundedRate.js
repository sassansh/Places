import { Rate } from 'antd';

function RoundedRate(props) {
    const { value, ...otherProps } = props;
    const roundedValue = (Math.round(value*2)/2);
    console.log(roundedValue);
    return <Rate allowHalf value={roundedValue} {...otherProps} />;
}

export default RoundedRate;
