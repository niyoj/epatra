import React from "react";
import { useRouter } from "next/router";
import NewsCard from "./NewsCard";

const Landing = () => {
  return (
    <NewsCard title="How to code news portal in 24 hours?" summary="Learning computer science helps students thrive in a rapidly changing world—more than 65% of young people will work in jobs that dont currently exist. Opportunities in the classroom and beyond."/>
  );
};

export default Landing;
