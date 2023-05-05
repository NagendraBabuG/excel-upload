import './Response.css'
const Response = ({status})=> {
    if(status === 200)
    {
        return <div className="wrapper">
            <h2 className="sh">Thank You!</h2>
            <div className='resp'>✅ File Successfully Uploaded.</div>
            <div>Your records will be processed shortly.</div>
        </div>
    }
    else{
        return <div className="wrapper">
            <h2 className="eh">Thank You!</h2>
            <div>❌Your record have some parameters Invalid Please Check</div>
        </div>
    }

}
export default Response