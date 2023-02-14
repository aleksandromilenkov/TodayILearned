import React, { useState, useEffect } from "react";
import supabase from "./supabase";
import "./style.css";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Aside from "./components/Aside/Aside";
import Facts from "./components/Section/Facts";
import Loading from "./components/Loading/Loading";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

// LINK TO APP SAMPLE DATA: https://docs.google.com/spreadsheets/d/1eeldcA_OwP4DHYEvjG0kDe0cRys-cDPhc_E9P9G1e3I/edit#gid=0

// 👍 🤯 ⛔️

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      let query = supabase.from("facts").select("*");
      if (category !== "all") {
        query = query.eq("category", category);
      }
      let { data: facts, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(200);
      if (!error) {
        setFacts(facts);
      } else {
        alert("There was a problem getting data");
      }
      setIsLoading(false);
    }
    getFacts();
  }, [category]);
  const shareFactHandler = () => {
    setShowForm((prevState) => !prevState);
  };
  const setFactsHandler = (fact) => {
    setFacts((prevState) => [...prevState, fact]);
  };
  const filterFactsHandler = (category) => {
    setCategory(category);
  };
  const interestingVotesHandler = (id, updatedFact) => {
    setFacts((prevState) => {
      return prevState.map((fact) => {
        if (fact.id === id) {
          return updatedFact[0];
        }
        return fact;
      });
    });
  };
  return (
    <>
      <Header onShareFact={shareFactHandler} formIsShowed={showForm} />
      {showForm && (
        <Form
          categories={CATEGORIES}
          initialFacts={facts}
          onSetFacts={setFactsHandler}
          onShowForm={shareFactHandler}
        />
      )}
      <main className="main">
        <Aside categories={CATEGORIES} onFilterFacts={filterFactsHandler} />
        {isLoading ? (
          <Loading />
        ) : (
          <Facts
            initialFacts={facts}
            categories={CATEGORIES}
            setInterestingVotes={interestingVotesHandler}
          />
        )}
      </main>
    </>
  );
};
export default App;
