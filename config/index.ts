const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://next-learning-8r04szxqk-darrenxu94.vercel.app";
