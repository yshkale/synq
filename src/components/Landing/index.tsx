import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

export const Landing = () => {
  return (
    <main className="my-8 lg:max-w-6xl lg:mx-auto flex flex-col space-y-44 mx-8">
      <Header />
      <Hero />
    </main>
  );
};
