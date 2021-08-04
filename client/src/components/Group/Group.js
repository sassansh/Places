import './Group.css'

import {
  ArrowRightOutlined,
  QuestionOutlined,
  StarFilled,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Row, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { setCurrentGroup } from '../../redux/actions/groupActions'
import { userRequestToJoinGroup } from '../../redux/actions/userActions'

function Group (props) {
  const users = useSelector((state) => state.users.allUsers)
  const reviews = useSelector((state) => state.reviews.allReviews)
  const places = useSelector((state) => state.places.allPlaces)
  const [numMembers, setNumMembers] = useState(0)

  const currentUserID = useSelector((state) => state.users.user.user_id)
  const currentUser = users.find((user) => user.user_id === currentUserID)

  const dispatch = useDispatch()

  useEffect(() => {
    let memberCount = 0
    if (users) {
      users.forEach((user) => {
        if (user.groups.includes(props.group.group_id)) {
          memberCount++
        }
      })
      setNumMembers(memberCount)
    }
  }, [users, props.group.group_id, numMembers])

  let numReviews = 0
  reviews.forEach((review) => {
    const place_id = review.place_id
    places.forEach((place) => {
      if (
        place_id === place.place_id &&
        props.group.group_id === place.group_id
      ) {
        numReviews++
      }
    })
  })

  function handleRequestToJoin () {
    dispatch(userRequestToJoinGroup(props.group.group_id))
  }

  function renderButton () {
    if (currentUser) {
      if (currentUser.groups.includes(props.group.group_id)) {
        return (
          <Link
            to='/groupview'
            onClick={() => {
              dispatch(setCurrentGroup(props.group.group_id))
            }}
          >
            <Button
              type='primary'
              icon={<ArrowRightOutlined size='large' />}
              size='medium'
            >
              Go to Group
            </Button>
          </Link>
        )
      } else if (currentUser.requestGroups.includes(props.group.group_id)) {
        return (
          <Button type='primary' size='medium' disabled>
            Requested to Join
          </Button>
        )
      } else {
        return (
          <Button
            type='primary'
            icon={<QuestionOutlined size='large' />}
            size='medium'
            style={{ background: 'orange', borderColor: 'orange' }}
            onClick={handleRequestToJoin}
          >
            Request to Join
          </Button>
        )
      }
    }
  }

  return (
    <Card style={{ margin: 16 }} onClick={props.onClick}>
      <Row justify='space-around' align='middle'>
        <Col lg={4} md={4} sm={24} xs={24} className='group'>
          <Row justify='center'>
            <Avatar src={props.group.avatarURL} size={64} />
          </Row>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Row justify='center' className='group-name'>
            {props.group.name}
          </Row>
          <Row justify='center' className='group-descrip'>
            {props.group.description}
          </Row>
        </Col>
        <Col lg={8} md={8} sm={24} xs={24}>
          <Row justify='center' align='middle'>
            <Col className='join-button'>{renderButton()}</Col>
            <Col className='reviews-members' flex='100px'>
              <Tooltip title={numReviews + ' reviews'}>
                <StarFilled size='large' />
                &nbsp;
                {numReviews}
              </Tooltip>
              &nbsp; &nbsp;
              <Tooltip title={numMembers + ' members'}>
                <UserOutlined size='large' />
                &nbsp;
                {numMembers}
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default Group
