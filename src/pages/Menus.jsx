import React, { useEffect, useState } from "react";
import MUIDataTables from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from "axios";
import AddMenu from '../Component/addMenu.jsx'
import UpdateMenu from '../Component/updateMenu.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
// import Shaqo from '../backend/Models/EmpModel.js'

function Menus() {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [openaddMenu, setaddMenu] = useState(false);
  const [openUpdateMenu, setopenUpdateMenu] = useState(false);
  // const [openDelete, setDelete] = useState(false);

  const handleAddClick = () => {
    setaddMenu(true);
  };
  const handleUpdateClick = () => {
    setopenUpdateMenu(true);
  };


  const [Menu, setMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // rpt=Report Employee
      const rptusers = await axios.get("api/read/menus/all");
      const resltData = rptusers.data; //data kuso shub ,kadib meesha ay kugu diyaarsan tahy aad

      // Check if createdAt property exists before sorting
      const sortresltData = resltData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.localeCompare(a.createdAt);
        }
        return 0;
      });

      setMenu(sortresltData);
    };

    fetchData();
  }, []);

  //table ka waxa lagu so bandhigaayo (icons)
  const [responsive, setresponsive] = useState("vertical");
  const [TableBodyHeight, setTableBodyHeight] = useState("400px");
  const [TableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setsearchBtn] = useState(true);
  const [printBtn, setprintBtn] = useState(true);
  const [downloadBtn, setdownloadBtn] = useState(true);
  const [viewColumnBtn, setviewColumnBtn] = useState(true);
  const [filterBtn, setfilterBtn] = useState(true);
  ///Columns ka waxee ku xirantahy int column oo database ka sameesan
  const columns = [
    { name: "ID", options: { filterOptions: { fulwidth: true } } },
    "Name",
    "Description",
    "Price",
    "Category",
    "Created Date"
  ];
  // Icons
  const options = {
    search: searchBtn,
    print: printBtn,
    download: downloadBtn,
    viewColumn: viewColumnBtn,
    filter: filterBtn,
    filtertype: "dropdown",
    TableBodyHeight,
    TableBodyMaxHeight,
    responsive,
    ontableChange(action, state) {
      console.log(action);
      console.dir(state);
    },
  };



  return (
    <div className="econtainer">
      <div className="title">
        <h1>RESTAURANT MANAGEMENT SYSTEM</h1>
      </div>
      <h1 className="h1_report"> Menu Report</h1>



      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTables
            title="Menu List"
            data={
              // datada hal hal ula so bax from database
              // Menu = waa modelski/ tableki database ku abuurnaa
              Menu.map((Menu) =>
                // xogtaan waxaan laga soo qaadanooyaa data.js
                [Menu.id, Menu.name, Menu.description, Menu.price, Menu.category, Menu.createdDate]
              )
            }
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>

      <div className="boton">
      
      <Link to="/updateMenu" onClick={handleUpdateClick}>
        <button className="btn_Update">Update</button>
      </Link>

      <Link to="/addMenu" onClick={handleAddClick}>
      <button className="btn_add">Add New</button>
      </Link>
      </div>
      {openaddMenu && <AddMenu setOpen={setaddMenu} />}
      {openUpdateMenu && <UpdateMenu setopenUpdate={setopenUpdateMenu} />}
      {/* {openDelete && <DeleteUser setOpen={setDelete} />} */}
    </div>
  );
}

export default Menus;