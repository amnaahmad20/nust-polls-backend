import mongoose from 'mongoose';
import casual from 'casual';

const Student = mongoose.model('Student');

const generateDummyData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect (process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dummyStudents = [];

    for (let i = 0; i < 10; i++) {
      const student = new Student({
        student: new mongoose.Types.ObjectId(),
        graduateLevel: casual.random_element(['UG', 'MS', 'PhD']),
        batch: casual.integer(2010, 2020).toString(),
        degree: casual.random_element(['B.Sc.', 'M.Sc.', 'Ph.D.']),
        section: casual.random_element(['A', 'B', 'C']),
        school: casual.company_name,
        department: casual.department,
        status: casual.random_element(['Hostellite', 'Dayscholar']),
        hostel: casual.random_boolean ? casual.word : undefined,
        transport: {
          pickAndDrop: casual.boolean,
          route: casual.random_boolean ? casual.street : undefined,
        },
        societies: [
          {
            name: casual.company_name,
            designation: casual.job_title,
          },
        ],
      });

      dummyStudents.push(student);
    }

    // Save dummy data to the database
    await Student.insertMany(dummyStudents);

    console.log('Dummy data has been generated and saved successfully.');
  } catch (error) {
    console.error('Error generating dummy data:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
};

generateDummyData();