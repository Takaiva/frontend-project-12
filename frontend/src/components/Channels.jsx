import React from 'react';
import {
    //useDispatch,
    useSelector
} from "react-redux";
import {
    //actions as channelsActions,
    selectors,
} from "../slices/channelsSlice.js";
import {
    Button,
    //ButtonGroup,
    Nav,
    Col,
    //Dropdown,
} from "react-bootstrap";

const Channel = (props) => {
    const { channel, currentChannelId } = props.data;

    return (
        <Nav.Item as="li" className="w-100">
            <Button
                variant={channel.id === currentChannelId ? 'primary' : 'secondary'}
                className="w-100 rounded-0 text-start"
                type="button"
            >
                <span className="me-1">#</span>
                {channel.name}
            </Button>
        </Nav.Item>
    );
}

const Channels = () => {
    //const dispatch = useDispatch();
    const channels = useSelector(selectors.selectAll);
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);

    return (
        <Col xs={4} md={2} className="border-end pt-4 px-0 bg-dark">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 ps-xxl-4 ps-xl-3 pb-3 pe-2 border-bottom border-2">
                <span style={{ "color": "white" }}>Channels</span>
                <Button
                    variant="outline-primary"
                    type="button"
                    >
                    +
                </Button>
            </div>
            <Nav as="ul" fill variant="pills" className="px-2">
                {channels.map((channel) => (
                    <Channel data={{channel, currentChannelId}} key={channel.id} />
                ))}
            </Nav>
        </Col>
    );
};

export default Channels;
