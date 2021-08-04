import { Layout } from 'antd';

const SideBar = ({ menu }) => {
  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      breakpoint={'lg'}
      theme="dark"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Layout.Sider>
  );
};
export default SideBar;
