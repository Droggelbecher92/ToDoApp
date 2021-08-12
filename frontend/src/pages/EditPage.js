import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import styled from "styled-components/macro";

export default function EditPage({changeTodo}) {
    const { id } = useParams()

    const [todo, setTodo] = useState()
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('OPEN')



    useEffect(() => {
        axios
            .get(`/api/todo/${id}`)
            .then(response => response.data)
            .then(fetchedTodo => setTodo(fetchedTodo))
            .catch(error => console.error(error))
    }, [id])

    useEffect(()=>{
        axios
            .get(`/api/todo/${id}`)
            .then(response => response.data)
            .then(fetchedTodo => setStatus(fetchedTodo.status))
            .catch(error => console.error(error))
    },[id])

    if (!todo) {
        return <p>loading</p>
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (description) {
            todo.description = description
            todo.status = status
            changeTodo(todo)
            setDescription('')

        }
    }
    


    return (
        <PageLayout>
            <Header />
            <Wrapper onSubmit={handleSubmit}>
                <input type="text" value={description} onChange={event => setDescription(event.target.value)}/>
                <select value={status} onChange={event => setStatus(event.target.value)}>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">Doing</option>
                    <option value="DONE">Done</option>
                </select>
                <button type="submit">change todo</button>
            </Wrapper>
            <h1>ToDo: {todo.description} |||| Status= {todo.status}</h1>
        </PageLayout>
    )
}

const Wrapper = styled.form`
`