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
    //Button,
    //ButtonGroup,
    Nav,
    Col,
    //Dropdown,
} from "react-bootstrap";

const Channel = (props) => {
    const { channel, currentChannelId } = props.data;

    return (
        <Nav.Item as="li" className="w-100">
            <button
                id="channel"
                className={`w-100 text-start mt-1 pb-2 pt-2 bg-white ${channel.id === currentChannelId ? 'activeChannel' : ''}`}
                type="button"
            >
                <span className="me-1">#</span>
                {channel.name}
            </button>
        </Nav.Item>
    );
}

const Channels = () => {
    //const dispatch = useDispatch();
    const channels = useSelector(selectors.selectAll);
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);

    return (
        <Col
            xs={4}
            md={2}
            className="border-end pt-3 px-0 bg-light"
            style={{ "borderRadius": "8px 0px 0px 34px", "border": "1px solid white"}}
        >
            <div
                className="d-flex flex-wrap justify-content-between align-items-center mb-2 ps-xxl-4 ps-xl-3 pb-3 pe-2 shadow-sm"
                //style={{ 'borderBottom': "2px solid orange"}}
            >
                <span style={{ "fontSize": "1.8rem" }}>Channels</span>
                <button
                    className="p-0 add-channel bg-light"
                    style={{ "width": "2.2rem" }}
                    type="button"
                    >
                    +
                </button>
            </div>
            <div>
            <Nav as="ul" fill variant="pills" className="px-2">
                {channels.map((channel) => (
                    <Channel data={{channel, currentChannelId}} key={channel.id} />
                ))}
            </Nav>
            </div>
        </Col>
    );
};

export default Channels;
