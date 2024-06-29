import { Config } from 'src/interfaces/config.interface';

export const config = (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoose: {
    uri: process.env.MONGODB_URI,
  },
});
