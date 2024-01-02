import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'localhost', // Your Redis server's host
  port: 6379, // Your Redis server's port
});

export default redisClient;
