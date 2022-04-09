import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";
import cw from "./assets/cw.svg";
import design from "./assets/design.svg";
import gman from "./assets/growing-up-man.svg";
import gwoman from "./assets/growing-up-woman.svg";
import mail from "./assets/mail.svg";
import man from "./assets/man.svg";
import map from "./assets/map.svg";
import padlock from "./assets/padlock.svg";
import phone from "./assets/phone.svg";
import woman from "./assets/woman.svg";

function App() {
 
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [gap, setGap] = useState("");
  const [blank, setBlank] = useState("");
  const [blank1, setBlank1] = useState("");
  const [gender, setGender] = useState("");
  const [rows, setRows] = useState([]);


  const handleClick = (e) =>{
    if (e.target.className === "email") {
      setGap("email");
      setBlank(email);
      setBlank1("");
    } else if (e.target.className === "name") {
      setGap("name");
      setBlank(first);
      setBlank1(last);
    } else if (e.target.className === "age") {
      setGap("age");
      setBlank(age);
      setBlank1("");
    } else if (e.target.className === "map") {
      setGap("city");
      setBlank(location);
      setBlank1("");
    } else if (e.target.className === "phone") {
      setGap("phone");
      setBlank(tel);
      setBlank1("");
    } else if (e.target.className === "pass") {
      setGap("password");
      setBlank(password);
      setBlank1("");
    }
  }

   const axiosApi = async() =>{
    const res = await axios("https://randomuser.me/api/");
    const info = res.data.results[0];
    setFirst(info.name.first);
    setLast(info.name.last);
    setPicture(info.picture.large);
    setEmail(info.email);
    setAge(info.dob.age);
    setLocation(info.location.city);
    setTel(info.phone);
    setPassword(info.login.password);
    setGap("name");
    setGender(info.gender);
    setBlank(info.name.first);
    setBlank1(info.name.last);  
   };

  useEffect(() => {
 axiosApi();  
}, []);

function addUser() {
  let ekle = createData(first, email, tel, age);
  !(rows[rows.length-1]?.first === first) && setRows([...rows, ekle]);
}

function createData(first, email, tel, age) {
  return { first, email, tel, age };
}

  return (
    <div className="App">
      <div className="big-back"></div>
      <img className="clarusway" src={cw} alt="" />
      <div className="container">
        <div className="small-back"></div>
        <img className="profil" src={picture} alt="" />
        <p>My {gap} is</p>
        <h2>
          {blank} {blank1}
        </h2>
        <div onClick={handleClick} className="picture-button">
          {gender === "male" ? (
            <img className="name" src={man} alt="" />
          ) : (
            <img className="name" src={woman} alt="" />
          )}
          <img className="email" src={mail} alt="" />
          {gender === "male" ? (
            <img className="age" src={gman} alt="" />
          ) : (
            <img className="age" src={gwoman} alt="" />
          )}
          <img className="map" src={map} alt="" />
          <img className="phone" src={phone} alt="" />
          <img className="pass" src={padlock} alt="" />
        </div>

        <div className="flex-button">
          <button onClick={axiosApi}>NEW USER</button>
          <button onClick={addUser}>ADD USER</button>
        </div>

        {rows.length > 0 && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="table-head">
                  <TableCell>FirstName</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index)=>{return(
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.first}
                  </TableCell>
                  <TableCell align="right">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">
                    {row.tel}
                  </TableCell>
                  <TableCell align="right">
                    {row.age}
                  </TableCell>
                </TableRow>)})}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div className="footer">
        <span className="fdesign">designed by</span>
        <img className="footer-image" src={design} alt="" />
        <span className="fname">Hamza PALA</span>
      </div>
    </div>
  );
}

export default App;
