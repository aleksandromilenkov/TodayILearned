import React from "react";
import Fact from "./Fact";
const Facts = (props) => {
  if (props.initialFacts.length <= 0) {
    return (
      <p className="message">
        No facts for this category yet. Create the first one!
      </p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {props.initialFacts.map((fact, idx) => (
          <Fact
            key={idx}
            id={fact.id}
            text={fact.text}
            source={fact.source}
            category={fact.category}
            votesInteresting={fact.votesInteresting}
            votesMindblowing={fact.votesMindblowing}
            votesFalse={fact.votesFalse}
            createdIn={fact.createdIn}
            categories={props.categories}
            setInterestingVotes={props.setInterestingVotes}
          />
        ))}
      </ul>
    </section>
  );
};

export default Facts;
