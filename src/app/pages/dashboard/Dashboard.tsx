import { Link } from "react-router-dom"

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to='/entrar'>Login</Link>
    </div>
  )
}