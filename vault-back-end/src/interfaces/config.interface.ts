export interface MongooseConfig {
  uri: string;
}

export interface Config {
  port: number;
  mongoose: MongooseConfig;
}
