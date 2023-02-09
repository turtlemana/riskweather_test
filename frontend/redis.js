import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL); 

export default redis;


// function getRedisConfiguration(): {
//     port: Maybe<number>;
//     host: Maybe<string>;
//     password: Maybe<string>;
//   } {
//     return configuration.redis;
//   }
  
//   export function createRedisInstance(
//     // config = getRedisConfiguration()
//   ) {
//     try {
//       const options = {
//         host: process.env.REDIS_HOST,
//         lazyConnect: true,
//         showFriendlyErrorStack: true,
//         enableAutoPipelining: true,
//         maxRetriesPerRequest: 0,
//         retryStrategy: (times) => {
//           if (times > 3) {
//             throw new Error(`[Redis] Could not connect after ${times} attempts`);
//           }
  
//           return Math.min(times * 200, 1000);
//         },
//       };
  
//       if (process.env.REDIS_PORT) {
//         options.port = process.env.REDIS_PORT;
//       }
  
//       if (process.env.REDIS_PASSWORD) {
//         options.password = process.env.REDIS_PASSWORD;
//       }
  
//       const redis = new Redis(options);
  
//       redis.on('error', (error) => {
//         console.warn('[Redis] Error connecting', error);
//       });
  
//       return redis;
//     } catch (e) {
//       throw new Error(`[Redis] Could not create a Redis instance`);
//     }
//   }