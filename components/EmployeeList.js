import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Box, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from '@mui/material';
import axios from 'axios';

const EmployeeList = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employee");
      setEmployees(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const handleEditEmployee = (employeeId) => {
    const employeeToEdit = employees.find(employee => employee._id === employeeId);
    console.log("ID received:", employeeId);
    setName(employeeToEdit.name);
    setEmail(employeeToEdit.email);
    setMobile(employeeToEdit.mobile);
    setDesignation(employeeToEdit.designation);
    setGender(employeeToEdit.gender);
    setCourses(employeeToEdit.courses);
    setEditingEmployeeId(employeeId);
  };

  const handleDeleteEmployee = async (employeeId) => {
    console.log("Employee ID to delete:", employeeId);
    try {
      await axios.delete(`/api/employee/${employeeId}`);
      fetchEmployees(); 
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter((course) => course !== value));
    }
  };

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const employeeData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      imgFile: imgFile || null 
    };
  
    try {
      const response = await axios.post("/api/employee", employeeData);
      console.log("Employee creation response:", response);
      if (response.status === 200 || response.status === 201) {
        console.log("Employee created successfully");
        fetchEmployees(); 
        setName(''); 
        setEmail('');
        setMobile('');
        setDesignation('');
        setGender('');
        setCourses([]);
        setImgFile(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("Error creating employee:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Employee
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <TextField
              label="Mobile No"
              variant="outlined"
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              required
            />
            <FormControl variant="outlined" required>
              <InputLabel id="designation-label">Designation</InputLabel>
              <Select labelId="designation-label" id="designation" value={designation} onChange={handleDesignationChange}>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>
            <FormControl component="fieldset" required>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <FormGroup row>
              <FormLabel component="legend">Course</FormLabel>
              <FormControlLabel control={<Checkbox value="MCA" onChange={handleCourseChange} />} label="MCA" />
              <FormControlLabel control={<Checkbox value="BCA" onChange={handleCourseChange} />} label="BCA" />
              <FormControlLabel control={<Checkbox value="BSC" onChange={handleCourseChange} />} label="BSC" />
            </FormGroup>
            <input type="file" id="img-upload" accept="image/jpeg, image/png" onChange={handleImgUpload} style={{ marginBottom: '1rem' }} />
            <Button variant="contained" sx={{ background:'#6c757d' }} type="submit" fullWidth>
              Create Employee
            </Button>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Box>
        </form>
      </Paper>
      <Paper elevation={3}  sx={{ width: '100%', padding: '1rem', overflowX: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Employee List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Unique Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile No.</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee,index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.courses.join(', ')}</TableCell>
                <TableCell>{employee.createdDate}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ background:'#6c757d',m:1 }} onClick={() => handleEditEmployee(employee._id)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteEmployee(employee._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default EmployeeList;
