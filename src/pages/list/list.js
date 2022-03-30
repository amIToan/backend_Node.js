import "./list.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/navbar"
import Database from "../../components/Database/Database"
const list = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Database />
            </div>
        </div>
    )
}

export default list