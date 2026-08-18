import './App.css'
import { useState, useEffect, useEffectEvent } from 'react'
import UserCard from './components/UserCard'
import axios from 'axios'

function App() {

  const [name, setName] = useState("Cleber")
  const [email, setEmail] = useState("cleber@email.com")
  const [age, setAge] = useState("22")
  const [users, setUsers] = useState([])

  useEffect(() => {

    async function buscarUsuarios() {
  
      const resposta = await axios.get('http://localhost:3000/usuarios')

      setUsers(resposta.data)

      }

      buscarUsuarios()
}, [])



async function handleSubmit(event) {
  event.preventDefault()

    await axios.post('http://localhost:3000/usuarios', {
      nome: name,
      email: email,
      idade: age
    })
  }

  return (

    <div className='app'>
      <h1>Cadastro de Usúarios</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder='Name' type='text' value={name} onChange={event => setName(event.target.value)}/>

        <input placeholder='Email' type='email' value={email} onChange={event => setEmail(event.target.value)}/>

        <input placeholder='Idade' type='number' value={age} onChange={event => setAge(event.target.value)}/>

        <button type='submit'>Cadastrar</button>
      </form>

      <div className='user-list'>
        
        {users.map( (user)=> (
          <UserCard key={user._id} user={user}/>
        ))}
                
      </div>
    
    </div>
  )
}

export default App
