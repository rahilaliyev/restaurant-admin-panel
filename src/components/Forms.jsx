import React from "react";

const Forms = ({ submitFn, labelId, labelName, inputValue, inputSetValue, labelId2, labelName2, inputPrice, inputSetPrice }) => {
  return (
    <form onSubmit={(e) => submitFn(e)}>
      <label htmlFor={labelId}>{labelName}</label>
      <input
        id={labelId}
        type="text"
        value={inputValue}
        onChange={(e) => {
          inputSetValue(e.target.value);
        }}
      />
      {labelId2 && (
        <>
          <label htmlFor={labelId2}>{labelName2}</label>
          <input id={labelId2} type="text" value={inputPrice} onChange={(e) => inputSetPrice(e.target.value)} />
        </>
      )}
      <button type="submit">Təsdiqlə</button>
    </form>
  );
};

export default Forms;
