import dbConnect from '../../utils/dbConnect';
import Employee from '../../models/Employee';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const employees = await Employee.find({});
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, mobile, designation, gender, courses, imgFile } = req.body;
      const newEmployeeData = {
        name,
        email,
        mobile,
        designation,
        gender,
        courses,
        imgFile: imgFile && Object.keys(imgFile).length ? imgFile : null
      };
      const newEmployee = new Employee(newEmployeeData);
      await newEmployee.save();
      res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['GET', 'POST'] });
  }
}
