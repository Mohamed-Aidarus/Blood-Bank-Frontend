import React, { useEffect, useState } from "react";
import MUIDataTables from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from "axios";
import AddEmployee from "../Component/adduser";
import toast, { Toaster } from 'react-hot-toast';
// import Shaqo from '../backend/Models/EmpModel.js'

function Orders() {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [open,setopen]=useState(false);

  const [order, setorder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // rpt=Report Employee
      const rptemployee = await axios.get("/api/read/all");
      const resltData = rptemployee.data; //data kuso shub ,kadib meesha ay kugu diyaarsan tahy aad

      // Check if createdAt property exists before sorting
      const sortresltData = resltData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.localeCompare(a.createdAt);
        }
        return 0;
      });

      setorder(sortresltData);
    };

    fetchData();
  }, []);

  //table ka waxa lagu so bandhigaayo (icons)
  const [responsive, setreponsive] = useState("vertical");
  const [TableBodyHeight, setTableBodyHeight] = useState("400px");
  const [TableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setsearchBtn] = useState(true);
  const [printBtn, setprintBtn] = useState(true);
  const [downloadBtn, setdownloadBtn] = useState(true);
  const [viewColumnBtn, setviewColumnBtn] = useState(true);
  const [filterBtn, setfilterBtn] = useState(true);
  ///Columns ka waxee ku xirantahy int column oo database ka sameesan
  const columns = [
    { name: "Fullname", options: { filterOptions: { fulwidth: true } } },
    "Email",
    "Tell",
    "Address",
    "Food Name",
    "Quantity",
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
      <h1 className="h1_report"> Orders Report</h1>

      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTables
            title="Orders List"
            data={
              // datada hal hal ula so bax from database
              // order = waa modelski/ tableki database ku abuurnaa
              order.map((order) =>
                // xogtaan waxaan laga soo qaadanooyaa Oder_Schema.js
                [order.fullname, order.email, order.tell, order.address, order.foodname, order.quantity ,order.created]
              )
            }
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>

    </div>
  );
}

export default Orders;
