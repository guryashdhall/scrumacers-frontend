import React,{useState,useEffect} from "react";
import { Grid,Paper} from "@material-ui/core";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card"
import { Table } from "react-bootstrap";
import {Row,Col} from "react-bootstrap"
import { Badge, Pill } from 'evergreen-ui'
import axios from "axios";
import { useSelector } from "react-redux";


class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = { 
      profile:{},
      badge_earned:[]
    
    };
  }


  getUserProfile(){
    let auth_token = this.getAuth_Token();
    axios
      .get(
        "https://scrum-acers-backend.herokuapp.com/api/user/profile",
        {
          headers: {
            Authorization: `${auth_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result[0])
        this.setState({ profile: res.data.result[0]});
      })
    ;
  }

  getAuth_Token() {
    let token = "";
    try {
      let data = JSON.parse(localStorage.getItem("LoginData"));
      token = "Bearer " + data.token;
    } catch {
      token = "";
    }
    return token;
  }

  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem("LoginData"));
    let emptype = userData.data[0].emp_type;
    let empid = userData.data[0].emp_id;
    this.setState({ emp_type: emptype, emp_id: empid });
    this.getUserProfile();
  }
 
    render() {
  
        const newpaperstyle = {
            margin: "30px auto",
            width: 900,
            padding: "20px 20px",
          };
       
      return (
      <>
      <Grid>
      <Paper elevation={15} style={newpaperstyle}>
        <Grid>
          <h4 className="text-primary" style={{marginLeft:"10px",textShadow:"1px 1px"}}>Welcome to your Profile</h4>
        </Grid>
        <Grid>
        <Card style={{ width: '54rem' }}>
        <Card.Body >
    
    <Card.Text>
     
    <Row>
        <div style={{marginLeft:"10px"}}>
          <Col >
            <Table responsive className="table table-borderless table-condensed table-hover " style={{ marginTop: "10px",width:"700px",border:"none"}}>
            <tbody style={{textAlign:"left",fontFamily:"sans-serif",fontSize:"17px",marginRight:"20%"}}>
            <tr >
                  <td>Employee Name</td>
                  <td>{this.state.profile.first_name} {this.state.profile.last_name}</td>  
                            
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{this.state.profile.email}</td>              
                </tr>
                <tr >
                <td>Employee Position</td>
                  <td>{this.state.profile.emp_position}</td>      
                </tr> 
                <tr >
                <td>Team Name</td>
                  <td>{this.state.profile.team_name}</td>      
                </tr>    
                <tr >
                <td>Team Description</td>
                  <td>{this.state.profile.team_description}</td>      
                </tr>   
                <tr >
                <td>Leaves Left</td>
                  <td>{this.state.profile.number_of_leaves_left}</td>      
                </tr> 
                <tr >
                <td>Badges Earned</td>
                  <td><Pill color="green" height="30px" width="120px"><h6 style={{marginTop:"5px"}}>Devoted</h6></Pill></td>         
                </tr> 
                <tr>
                  <td></td>
                  <td ><Pill color="teal" height="30px" width="120px"><h6 style={{marginTop:"5px"}}>Great Job</h6></Pill></td> 
                </tr>
               
                 </tbody>       
                  </Table>
                  </Col>
                  </div></Row>
    
    </Card.Text>    
  </Card.Body>
</Card>             
        </Grid>
          </Paper></Grid>
          </>
      )
    }
  }

export default MyProfile;