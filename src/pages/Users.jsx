import React, { useEffect, useState } from "react";
import MUIDataTables from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from "axios";
import AddUser from "../Component/adduser";
import UpdateUser from '../Component/updateuser.jsx'
import DeleteUser from '../Component/deleteuser.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

// import Shaqo from '../backend/Models/EmpModel.js'

function Users() {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [openUser, setopenUser] = useState(false);
  const [openUpdate, setopenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleAddClick = () => {
    setopenUser(true);
  };
  const handleUpdateClick = () => {
    setopenUpdate(true);
  };

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // rpt=Report Employee
      const rptusers = await axios.get("/api/read/user/all");
      const resltData = rptusers.data; //data kuso shub ,kadib meesha ay kugu diyaarsan tahy aad

      // Check if createdAt property exists before sorting
      const sortresltData = resltData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.localeCompare(a.createdAt);
        }
        return 0;
      });

      setUsers(sortresltData);
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
    "User Name",
    "Password",
    "Creation Date",
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

  // const data = [
  //   ['Mohamed Aidarus ','Farhiyo Ahmed', 'Liido', 555555 ],
  //   ['Luul Hamze ','Xawo Ali', 'Bakaaraha', 6666666 ],
  //   ['Shukri Sheikh A/llahi ','Xabiibo ali', 'Kaaraan', 7777777 ],
  // ];

  return (
    <div className="econtainer">
      <div className="title">
        <h1>RESTAURANT MANAGEMENT SYSTEM</h1>
      </div>
      <h1 className="h1_report"> Users Report</h1>



      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTables
            title="Users List"
            data={
              // datada hal hal ula so bax from database
              // Users = waa modelski/ tableki database ku abuurnaa
              Users.map((user) =>
                // xogtaan waxaan laga soo qaadanooyaa data.js
                [user.id, user.name, user.username, user.password, user.created]
              )
            }
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>

      <div className="boton">
      <Link to="/deleteUser" onClick={handleDeleteClick}>
        <button className="btn_delete">Delete</button>
      </Link>
        <Link to="/updateUser" onClick={handleUpdateClick}>
        <button className="btn_Update">Update</button>
      </Link>

      <Link to="/addUser" onClick={handleAddClick}>
      <button className="btn_add">Add New</button>
      </Link>
      </div>
      {openUser && <AddUser setOpen={setopenUser} />}
      {openUpdate && <UpdateUser setopenUpdate={setopenUpdate} />}
      {openDelete && <DeleteUser setOpen={setOpenDelete} />}
     {/*  {openDelete && <DeleteUser setOpen={setDelete} />} */}
    </div>
  );
}

export default Users;