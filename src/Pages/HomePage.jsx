import { Link } from "react-router-dom"
import ServiceButton from "../Components/ServiceButton"

function HomePage() {
    // const [count, setCount] = useState(0)
    return (
        <>
            <img src='/src/assets/muselink.svg'></img>
            <h1>MuseLink</h1>

            <ServiceButton to="/gigs">Search Gigs</ServiceButton>
            <ServiceButton to="/schedule">Schedule</ServiceButton>
            <ServiceButton to="/pay">Book & Pay</ServiceButton>
        </>
    )
  }
  
  export default HomePage