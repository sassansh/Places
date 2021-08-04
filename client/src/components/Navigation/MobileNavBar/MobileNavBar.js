import './MobileNavBar.css'

import { Button, Drawer, Dropdown, Menu } from 'antd'
import { LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import logo from '../../../assets/logo.png'
import { logoutUser } from '../../../redux/actions/userActions'
import { useState } from 'react'

const MobileNavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false)
  const allUsers = useSelector((state) => state.users.allUsers)

  const currentUserID = useSelector((state) => state.users.user.user_id)
  const userName = useSelector((state) => state.users.user.name)
  const currentUser = allUsers.find((user) => user.user_id === currentUserID)

  const dispatch = useDispatch()

  function handleLogout () {
    dispatch(logoutUser())
  }

  const profileMenu = (
    <Menu>
      <Menu.Item key='0' icon={<UserOutlined />}>
        <Link to='/userprofile'>{userName}</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout} key='1' icon={<LogoutOutlined />}>
        <Link to='/login'>Log Out</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <nav className='navbar'>
      <Button
        className='menu'
        type='primary'
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title='Menu'
        placement='left'
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        drawerStyle={{
          backgroundColor: '#041527'
        }}
      >
        {menu}
      </Drawer>
      <span className='logo'>
        <a href='/'>
          <img src={logo} className='logo' alt='logo' />
        </a>
        Places
      </span>
      <Dropdown overlay={profileMenu} trigger={['click']}>
        <span className='profilepic'>
          {currentUser && (
            <img
              src={currentUser.avatarURL}
              className='profilepic'
              alt='profile pic'
            />
          )}
        </span>
      </Dropdown>
    </nav>
  )
}
export default MobileNavBar
