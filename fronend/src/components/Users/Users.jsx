import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModalComponent from './Modal';

const Users = () => {

    const dispatch = useDispatch();
    const { users, selectedUser } = useSelector(state => state.usersReducer);
    const { message: globalMessage, msgType } = useSelector(state => state.globalReducer)

    const [messageVariant, setMessageVariant] = useState(msgType);
    const [showMessage, setShowMessage] = useState(true);

    const [offset, setOffset] = useState(0);
    const limit = 2;

    useEffect(() => {
        setMessageVariant(msgType === 'error' ? 'danger' : msgType);
    }, [msgType])
    
    useEffect(() => {
        dispatch({
            type: 'apiRequest',
            payload: {
                url: `users`,
                method: 'GET',
                onSuccess: 'users/getUsers',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'getUsers',
                params: {
                    limit,
                    offset
                }
            }
        });
    }, [offset]);

    const getUserDetails = (id) => {
        dispatch({
            type: 'apiRequest',
            payload: {
                url: `users/${id}`,
                method: 'GET',
                onSuccess: 'users/getUserDetails',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'getUserDetails',
            }
        });
    }

    return (
        <>
            <h2>Users</h2>
            <ModalComponent user={selectedUser} displayModal={selectedUser?.id} />
            {globalMessage && showMessage && <Alert onClose={() => setShowMessage(false)} key={messageVariant} dismissible variant={messageVariant}>{globalMessage}</Alert>}
            <ListGroup as="ul">
                {users?.map((user, index) => {
                    return (
                        <ListGroup.Item action onClick={() => getUserDetails(user.id)} as="li" key={index} className="d-flex justify-content-between align-items-start">
                            <Image src={user.image} thumbnail roundedCircle width={50} height={50} />
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{user.firstName} {user.maidenName} {user.lastName}</div>
                                {user.email}
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <br />
            <ButtonGroup aria-label="Basic example">
                <Button disabled={offset === 0} variant="secondary" onClick={() => setOffset(offset - 2)}>Back</Button>
                <Button disabled={users?.length < limit} variant="secondary" onClick={() => setOffset(offset + 2)}>Next</Button>
            </ButtonGroup>
        </>
    )
}

export default Users;
