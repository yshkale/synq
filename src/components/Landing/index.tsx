import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

export const Landing = () => {
  return (
    <main className="my-8 max-w-6xl mx-auto flex flex-col space-y-44">
      <Header />
      <Hero />
    </main>
  );
};
