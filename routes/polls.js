import express from "express";
import Poll from '../models/poll.js'
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
const pollRoutes = express.Router({ mergeParams: true });


pollRoutes.get("/polls/:adminId", async (request, response) => {


    const connectionString = "mongodb+srv://admin:admin@cluster0.mdp53.mongodb.net/nust-polls?retryWrites=true&w=majority"
    const connector = mongoose.connect(connectionString)
    console.log(request.params)
    let polls = await connector.then(async () => {
        var ObjectId = mongoose.Types.ObjectId; 
        return await Poll.find({ admin: new ObjectId(request.params.adminId) }); 
    })
  
    try {
      response.send(polls);
    } 
    catch (error) {
      response.status(500).send(error);
    }

  });



pollRoutes.post("/polls/create", async (request, response) => {


  const connectionString = "mongodb+srv://admin:admin@cluster0.mdp53.mongodb.net/nust-polls?retryWrites=true&w=majority"
  const connector = mongoose.connect(connectionString)
  await connector.then(async () => {
        var ObjectId = mongoose.Types.ObjectId; 
        await Poll.create({

          admin: new ObjectId(request.body.admin),
          poll_name: request.body.poll_name,
          description: request.body.description

        });

    })

	response.send("Done")
  

}

)

app.use('',pollRoutes)


const PORT = 3000
const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});


export default pollRoutes;
