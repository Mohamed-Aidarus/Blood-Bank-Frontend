
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const DeleteUser = ({setOpen}) => {
  const[id, setid]=useState('');

 
  const navigate = useNavigate();


  const userHandler = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.delete('/api/delete/menus');
  
      if (response.status === 200) {
        const deletedUser = response.data.user;
        console.log(`Deleted user:`, deletedUser);
  
        toast.success(`User ${deletedUser.name} (${deletedUser.username}) deleted successfully`);
        navigate('/Users');
      } else if (response.status === 404) {
        toast.error('User not found');
      } else {
        toast.error('An error occurred');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };



  return (
   
    <div>
       <div className="title">
    <h1>RESTAURANT MANAGEMENT SYSTEM</h1>
  </div>

      <div className="wrapper_addUser">
        <div className="form-box forgot">
          <h2>Delete User by Id</h2>
          <form  onSubmit={userHandler}>
          <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="number"  onChange={(e)=>setid(e.target.value)} required />
              <label>ID</label>
            </div>

            
            <button type="submit" className="btn_ADD">
              Submit
            </button>
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

export default DeleteUser;