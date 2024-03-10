import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-slate-300 rounded-lg p-5">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold">About</h1>
        <h3 className="font-bold">About Rodin shomaf</h3>
        <p>
          Welcome to my corner of the web! I'm Rodin shomaf, a passionate
          full-stack web developer excited to embark on this digital journey
          with you. As I dive into the world of web development, I'm eager to
          share my skills, experiences, and creations with you.
        </p>
        <h3 className="font-bold">Why Web Development?</h3>
        <p>
          Web development isn't just a job for me—it's a creative outlet and a
          lifelong learning adventure. I'm fascinated by the endless
          possibilities of the web and the power it holds to connect people,
          ideas, and businesses across the globe. Every line of code I write is
          infused with a passion for innovation and a commitment to excellence.
        </p>
        <h3 className="font-bold">Get in Touch</h3>
        <p>
          Whether you're a fellow developer, a potential collaborator, or
          someone simply curious about the world of web development, I'd love to
          connect with you. Let's build something amazing together!
        </p>
        <p>
          Thank you for visiting, and I look forward to sharing this exciting
          journey with you.
        </p>
      </div>
    </div>
  );
}
