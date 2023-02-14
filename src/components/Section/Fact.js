import React, { useState } from "react";
import supabase from "../../supabase";

const Fact = ({
  id,
  text,
  source,
  category,
  votesInteresting,
  votesMindblowing,
  votesFalse,
  createdIn,
  categories,
  setInterestingVotes,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const isDisputed = votesInteresting + votesMindblowing < votesFalse;
  const handleVote = async (column) => {
    let whatToIncrease = 0;
    if (column === "votesInteresting") whatToIncrease = votesInteresting;
    if (column === "votesMindblowing") whatToIncrease = votesMindblowing;
    if (column === "votesFalse") whatToIncrease = votesFalse;

    setIsUploading(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [column]: whatToIncrease + 1 })
      .eq("id", id)
      .select();
    setIsUploading(false);
    if (!error) setInterestingVotes(id, updatedFact);
  };

  return (
    <li className="fact">
      <p>
        {isDisputed && (
          <span
            style={{ color: "#ef4444", fontWeight: 600, marginRight: "10px" }}
          >
            [ ⛔DISPUTED ]
          </span>
        )}
        {text}
        <a
          className="source"
          href={source}
          target="_blank"
          rel="noopener noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find((cat) => cat.name === category)
            .color,
        }}
      >
        {category}
      </span>

      <div className="vote-buttons">
        <button
          disabled={isUploading}
          onClick={() => handleVote("votesInteresting")}
        >
          👍 {votesInteresting}
        </button>
        <button
          disabled={isUploading}
          onClick={() => handleVote("votesMindblowing")}
        >
          🤯 {votesMindblowing}
        </button>
        <button disabled={isUploading} onClick={() => handleVote("votesFalse")}>
          ⛔️ {votesFalse}
        </button>
      </div>
    </li>
  );
};

export default Fact;
