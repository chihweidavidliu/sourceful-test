import { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'


const Portal: FunctionComponent = ({ children }) => ReactDOM.createPortal(children, document.querySelector("#portal")!);

export default Portal;