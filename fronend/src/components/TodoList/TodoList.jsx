import React, { useState } from 'react';
import { addTask, removeTask } from '../../redux/reducers/todolist';
import { useDispatch, useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const TodoList = () => {

    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();
    const { tasks, message } = useSelector(state => state.todoListReducer);

    const handleChange = (e) => {
        setTaskName(e.target.value);
    }

    const handleAddTask = () => {
        dispatch(addTask({
            taskName
        }))
    }

    const handleRemoveTask = (id) => {
        dispatch(removeTask({
            id
        }))
    }

    return (
        <div>
            <h2>Todo List</h2>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Task name here..."
                    aria-label="Task name here"
                    aria-describedby="basic-addon2"
                    type="text"
                    id="task_name"
                    name="task_name"
                    onChange={handleChange}
                />
                <Button onClick={() => handleAddTask()} variant="outline-secondary" id="button-addon2">
                    Add task
                </Button>
            </InputGroup>
            {message && <Alert key={'success'} variant={'success'}>{message}</Alert>}
            <ListGroup as="ol" numbered>
                {tasks?.map((task, index) => {
                    return (
                        <ListGroup.Item as="li" key={index} className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{task.name}</div>
                            </div>
                            <button onClick={() => handleRemoveTask(task?.id)}>Delete task</button>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
}

export default TodoList;
