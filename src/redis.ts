import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost', // Your Redis server's host
  port: 6379, // Your Redis server's port
});

console.log('## redis : ', redis);
export default redis;
