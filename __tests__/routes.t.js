import request from 'supertest';
import { app } from "../app.js"




describe('Good Home Routes', function () {

  test('responds to get polls', async () => {

    const res = await request(app).get('/polls/6238cd4fee7418ba7890b083');
    expect(res.statusCode).toBe(200);
    
  });
  
  test('responds to edit', async () => {

    const res = await request(app).post('/polls/edit/625183c6a5922ce026818b96').send({poll_name:"Updated Poll Name"});
    expect(res.statusCode).toBe(200);
    
  });

});