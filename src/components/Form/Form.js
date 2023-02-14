import React, { useState } from "react";
import supabase from "../../supabase";
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
const Form = (props) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (text.length > 200 || !isValidHttpUrl(source) || !category) {
      return;
    }

    const { data: newFact, error } = await supabase
      .from("facts")
      .insert({ text, source, category })
      .select();
    setIsUploading(false);
    if (!error) props.onSetFacts(newFact[0]);
    setText("");
    setCategory("");
    setSource("");
    props.onShowForm();
  };
  return (
    <form className="fact-form" onSubmit={formSubmitHandler}>
      <input
        disabled={isUploading}
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        disabled={isUploading}
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option key={42242} value="">
          Choose category:
        </option>
        {props.categories.map((category, idx) => (
          <option key={idx} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

export default Form;
