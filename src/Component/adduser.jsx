
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddUser = ({setOpen}) => {
  const[id, setid]=useState('');
  const[name, setname]=useState('');
  const[username, setusername]=useState('');
  const[password, setpassword]=useState('');

  const navigate = useNavigate();

  const userHandler= async(event)=>{
    event.preventDefault();
    // setloading(true);
    
    try{
        await axios.post('/api/insert/user/add',{
          id,
          name,
          username,
          password,

        });
        toast.success("xogta waala xareeye");
        // setloading(false);
        navigate('/Users');
  
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

      <div className="wrapper_addUser">
        <div className="form-box forgot">
          <h2>Add User</h2>
          <form  onSubmit={userHandler}>
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
              <input type="text" value={username} onChange={(e)=>setusername(e.target.value)} required />
              <label>User-Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password"onChange={(e)=>setpassword(e.target.value)} required />
              <label>Password</label>
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

export default AddUser;