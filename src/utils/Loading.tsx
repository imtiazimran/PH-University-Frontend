import { Spin } from "antd";

const Loading = () => {
    return <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}  size="large" />;
};

export default Loading;
