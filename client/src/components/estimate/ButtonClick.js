import React, { useState } from "react";

function bits(n) {
  var res = [];
  while (n) {
    res.push(n & 1);
    n >>= 1;
  }
  return res;
}

const ButtonClick = () => {
  const [buttons, setButtons] = useState();
  const preventDefault = e => {
    e.preventDefault();
  };
  const handleChange = e => {
    preventDefault(e);
    console.log(e.buttons);
    setButtons(buttons => {});
  };

  var names = ["Left", "Right", "Middle", "Back", "Forward"];

  // buttons is a bitmask
  var pad = "00000";
  //   var buttons = bits(this.state.buttons)
  //   const buttonsTemp = buttons;
  //   buttonsTemp.concat([0, 0, 0, 0, 0]).slice(0, names.length);

  //   var active = buttons.map((x, i) => {
  //     return (
  //       <div>
  //         {names[i]}: {x === 1 ? "Yes" : "No"}
  //       </div>
  //     );
  //   });

  return (
    <section onContextMenu={preventDefault} onMouseDown={handleChange} tabIndex={-1}>
      <div>
        <h4>{/* Buttons: {buttons} ({buttons.join("")}) */}Mouse TEST</h4>
        {/* {active} */}
      </div>
    </section>
  );
};
export default ButtonClick;
