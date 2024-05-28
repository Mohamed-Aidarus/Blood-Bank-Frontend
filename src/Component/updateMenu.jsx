
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateMenu = ({setOpen}) => {
  const[id, setid]=useState('');
  const[name, setname]=useState('');
  const[description, setdescription]=useState('');
  const[price, setprice]=useState('');
  const[category, setcategory]=useState('');



  const navigate = useNavigate();

  const menuHandler= async(event)=>{
    event.preventDefault();
    // setloading(true);
    
    try{
        await axios.put('/api/update/menus',{
          id,
          name,
          description,
          price,
          category,



        });
        toast.success("xogta waala Update gareeye");
        // setloading(false);
        navigate('/Menus');
  
    }catch (e) {
      // setloading(false);
      toast.error(e.response.data);
      console.error(e)
     
    }
  }



  return (
   
    <div>
       <div className="title">
    <h1>RESTAURANT MANAGEMENT SYSTEM</h1>
  </div>

      <div className="wrapper_AddMenu">
        <div className="form-box forgot">
          <h2>Update Menu by ID</h2>
          <form  onSubmit={menuHandler}>
          <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="number" value={id} onChange={(e)=>setid(e.target.value)} required />
              <label>ID</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="text" value={name} onChange={(e)=>setname(e.target.value)} required />
              <label>Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="text" value={description} onChange={(e)=>setdescription(e.target.value)} required />
              <label>Description</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="number" value={price} onChange={(e)=>setprice(e.target.value)} required />
              <label>Price</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="text" value={category} onChange={(e)=>setcategory(e.target.value)} required />
              <label>Category</label>
            </div>
            <button type="submit" className="btn_ADD">
              Submit
            </button>
            <Toaster />
          </form>
        </div>
      </div>
      <script src="forgot_password.js"></script>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
};

export default UpdateMenu;