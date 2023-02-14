import React from "react";

const Aside = (props) => {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => {
              props.onFilterFacts("all");
            }}
          >
            All
          </button>
        </li>
        {props.categories.map((category, idx) => {
          return (
            <li key={idx} className="category">
              <button
                style={{ background: category.color }}
                className="btn btn-all-categories"
                onClick={() => {
                  props.onFilterFacts(category.name);
                }}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
