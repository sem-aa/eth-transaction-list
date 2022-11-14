import "./Containers.scss"

const MainContainer = ({children}) => {
    return(
        <div className="Container" >
            {children}
        </div>
    )
}

export default MainContainer