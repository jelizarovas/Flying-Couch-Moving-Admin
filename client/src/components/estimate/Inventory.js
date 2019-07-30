import React from "react";
import ChipInput from "material-ui-chip-input";
import Chip from "@material-ui/core/Chip";

const Inventory = () => {
  return (
    <div style={{ minHeight: "10em" }}>
      <ChipInput
        // chipContainerStyle={{ height: "200px" }}
        placeholder="Separate items by comma, semicolon or new line"
        blurBehavior="add"
        variant="outlined"
        // value={dates.map(({ text }) => text.short)}
        // onAdd={handleChipAdd}
        // onDelete={handleChipDelete}
        fullWidth
        fullWidthInput
        // disableUnderline
        chipRenderer={({ value, isFocused, isDisabled, handleClick, handleDelete, className }, key) => (
          <Chip
            size="medium"
            variant="outlined"
            key={key}
            className={className}
            style={
              {
                //   fontWeight: isChipSelected(value) ? 500 : "inherit"
              }
            }
            // onDelete={() => (!isChipSelected(value) ? handleDelete() : null)}
            label={value}
            // onClick={() => handleSelect(value)}
            // icon={!isChipPriority(value) ? <EventIcon /> : <StarIcon />}
            // deleteIcon={!isChipSelected(value) ? <CancelIcon /> : <EditIcon style={{ color: "green" }} />}
          />
        )}
      />
    </div>
  );
};

export default Inventory;
