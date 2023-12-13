import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {


/*
  <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
*/

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">Patient List</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
