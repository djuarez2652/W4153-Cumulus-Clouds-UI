import ServiceButton from "../Components/ServiceButton"
import BackButton from "../Components/BackButton"

function SchedulerPage() {
  
    return (
        <>  
            <div className="topleft-corner">
                <BackButton to="/"/>
            </div>
            <h1>Schedule</h1>
            


            <ServiceButton to="/pay">Book & Pay</ServiceButton>
        </>
    )
  }
  
  export default SchedulerPage