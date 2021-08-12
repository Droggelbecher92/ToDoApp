import {useHistory, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import styled from "styled-components/macro";
import {statusToURL} from "../service/todo-service";

export default function EditPage({changeTodo}) {
    const {id} = useParams()

    const [todo, setTodo] = useState()
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const history = useHistory()


    useEffect(() => {
        axios
            .get(`/api/todo/${id}`)
            .then(response => response.data)
            .then(fetchedTodo => setTodo(fetchedTodo))
            .catch(error => console.error(error))
    }, [id])


    if (!todo) {
        return <p>loading</p>
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (description && status) {
            todo.description = description
            todo.status = status
            changeTodo(todo)
            setDescription('')
            history.replace(`/board/${statusToURL(status)}`)
        }
    }

    const backToDefault = () => {
        setDescription('')
        setStatus('')
    }

    return (
        <PageLayout>
            <Header/>
            <Wrapper onSubmit={handleSubmit}>
                <h3>ToDo: {todo.description}</h3>
                <input type="text" value={description} onChange={event => setDescription(event.target.value)}/>
                <h3>Status: {todo.status}</h3>
                <select value={status} onChange={event => setStatus(event.target.value)}>
                    <option value=''>choose...</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">Doing</option>
                    <option value="DONE">Done</option>
                </select>
                <button type="button" onClick={backToDefault}>clear all</button>
                <button type="submit">submit change</button>
            </Wrapper>
        </PageLayout>
    )
}


const Wrapper = styled.form`
  padding: 12px;
  display: grid;
  grid-template: repeat(3,70px)/repeat(2,200px);
  place-content: center;
  place-items: center;
`