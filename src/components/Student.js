import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper , Button } from '@mui/material'

export default function Student() {
  const paperstyle={padding:'50px 20px', width:600,margin:"20px auto"}
  const [name,setName]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [dob,setDob]=React.useState('')
  const [age,setAge]=React.useState('')
  const [students,setStudents]= React.useState([]);
  
  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,email,dob,age}
    console.log(student)
    fetch("http://localhost:8090/api/v1/storeNewStudent",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    
    }).then(()=>{
    console.log("New Student Added")
    })
  }

  React.useEffect(()=>{
    fetch("http://localhost:8090/api/v1/student1")
    .then(res=>res.json())
    .then((result)=>{
      setStudents(result);
    }
  )},[])


  
  return (

    <Container>
      <Paper elevation={3} style={paperstyle}>
        <h1>ADD STUDENT</h1>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="name" variant="outlined" fullWidth
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <TextField id="outlined-basic" label="email" variant="outlined" fullWidth
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField id="outlined-basic" label="dob" variant="outlined" fullWidth
          value={dob}
          onChange={(e)=>setDob(e.target.value)}
          />
          <TextField id="outlined-basic" label="age" variant="outlined" fullWidth
          value={age}
          onChange={(e)=>setAge(e.target.value)}/>
        <Button variant="contained" onClick={handleClick}>Submit</Button>
        </Box>
        {name}
        {email}
        {dob}
        {age}
      </Paper>

      <Paper elevation={3} style={paperstyle}>
        <h1>STUDENT LIST</h1>
        
        {students.map(student=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
            ID:{student.id}<br/>
            Name:{student.name}<br/>
            EMAIL:{student.email}<br/>
            DOB:{student.dob}<br/>
            AGE:{student.age}<br/>

          </Paper>
        ))
        }

      </Paper>

    </Container>
  );
} 
