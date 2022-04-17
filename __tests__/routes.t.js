import request from 'supertest';
import { app } from "../app.js"




describe('Testing Poll Fetching Route', function () {

  test('ID with Invalid format', async () => {

    await request(app).get('/polls/62cd4fee7418ba78').then((res) => {
      expect(res.statusCode).toBe(500);

    });
    
  });
  
  test('Correct Admin ID', async () => {

    await request(app).get('/polls/6238cd51ee7418ba7890b087').then((res) => {
      expect(res.statusCode).toBe(200);

    });

  });

  test('ID with a valid format that does not exist', async () => {

    await request(app).get('/polls/6238cd4fee7418ba2890b983').then((res) => {
      expect(res.statusCode).toBe(500);

    });
  
    
  });



});



describe('Testing Edit Route', function(){

  test('responds to edit', async () => {

    const res = await request(app).post('/polls/edit/625183c6a5922ce026818b96').send({poll_name:"Updated Poll Name"});
    expect(res.statusCode).toBe(200);
    
  });


})

