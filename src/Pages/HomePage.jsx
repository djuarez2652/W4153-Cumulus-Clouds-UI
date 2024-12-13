import { Link } from "react-router-dom"
import ServiceButton from "../Components/ServiceButton"

function HomePage() {
    // const [count, setCount] = useState(0)
    return (
        <>
            <img src='/src/assets/greenmuselink.svg'></img>
            <h1>Welcome to MuseLink</h1>
            <ServiceButton to="/login">Login</ServiceButton>
            <ServiceButton to="/register">Register</ServiceButton>

            {/* <ServiceButton to="/gigs">Search Gigs</ServiceButton>
            <ServiceButton to="/schedule">Schedule</ServiceButton>
            <ServiceButton to="/transaction">Transaction</ServiceButton> */}

        </>
    )
  }
  
  export default HomePage