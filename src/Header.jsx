import logo from './images/react.png';

function Header(){
    return(
        <div classname = "pt-3 pl-2" style = {{borderBottom:"1px solid #777"}}>
            <img src = {logo} alt ="" style={{height:"35px", verticalAlign:"top"}}/>
            <span className = "h2 pt-4 m-2 text-black-50">React Course - CountOpedia</span>
        </div>
    )
}
export default Header;