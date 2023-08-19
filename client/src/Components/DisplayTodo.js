import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
const DisplayTodo = () => {
    const [todoDisplay, setTodoDisplay] = useState([])
    const navigate = useNavigate()
    const getTodos = () => {
        axios.get('https://todo-app-xj31.onrender.com/')
        .then((response) => {
            console.log(response)
            setTodoDisplay(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
   
    const deleteTodo = async (id) => {
        await axios.delete(`https://todo-app-xj31.onrender.com/${id}`)
        .then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
        getTodos()
      }
      useEffect(() => {
        getTodos()
    }, [])
    return(
        <div className="display-todo-data">
        <Link to={'/addtodo'} className="link-btn-display">ADD TODO</Link>
        <Link to={'/'} className="logout">LOGOUT</Link>
            <p className="para-display">Displaying your todos here</p>
        <table className="table">
        <thead>
            <tr>
                <th scope="col" className="slno">SL.NO</th>
                <th scope="col" className="todos-data">TODOS</th>
                <th scope="col" className="todo-delete">DELETE</th>
                <th scope="col" className="todo-update">UPDATE</th>
            </tr>
        </thead>
        <tbody>
        {
            todoDisplay && todoDisplay.map((tododisp, i) => {
                return(
                    <tr key={i} className="tr-key">
                    <td className="table-primary">{i+1}</td>
                    <td><h4 className="todo-list-data">{tododisp.todo}</h4></td>
                    <td><span><button onClick={() => deleteTodo(tododisp._id)}>❌</button></span></td>
                    <button className="edit-btn"><Link to={`/update/${tododisp._id}`}>📝</Link></button>
                    </tr>
                )
            })
        }
        </tbody>
        </table>
        </div>
    )
}
export default DisplayTodo