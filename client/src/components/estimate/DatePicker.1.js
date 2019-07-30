import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";

import ChipInput from "material-ui-chip-input";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import EventIcon from "@material-ui/icons/Event";
import StarIcon from "@material-ui/icons/Star";

import { format, addDays, subDays, setDay, isPast, isToday, isSameDay, addWeeks, parse, isValid } from "date-fns";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function ChipsArray() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);

  const handleCalendarClick = (day, { selected }) => handleDate(day, "Added Via Calendar", selected ? true : false);

  const handleChipDelete = chip => setDates(dates => dates.filter(currChip => currChip.text.short !== chip));

  const handleChipAdd = chip => {
    const date = userDateEntryParse(chip);
    const anyMatches = dates.filter(enteredChip => isSameDay(enteredChip.date, date));
    if (!Array.isArray(anyMatches) || !anyMatches.length) handleDate(date, chip);
  };

  const handleDate = (date, preParse, remove) => {
    if (!isValid(date)) return console.log("Invalid date submitted");
    const chip = preParse || "";
    const toRemove = remove || false;
    setDates(dates => {
      return toRemove
        ? dates.filter(dateToDelete => !isSameDay(dateToDelete.date, date))
        : [
            ...dates,
            date
              ? {
                  date: date,
                  text: {
                    short: format(date, "MM/dd"),
                    long: format(date, "MM/dd/yyyy"),
                    day: format(date, "iiii")
                  },
                  beforeParse: chip,
                  priority: dates.length === 0 ? true : false
                }
              : {}
          ];
    });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleWeekClick = (weekNumber, days) => {
    let selectedCount = 0;
    days.map(day => {
      const anyMatches = dates.filter(({ date }) => isSameDay(date, day));
      if (!Array.isArray(anyMatches) || !anyMatches.length) {
        handleCalendarClick(day, { selected: undefined });
      } else {
        selectedCount++;
      }
      return selectedCount;
    });
    if (selectedCount === 7) {
      days.map(day => handleCalendarClick(day, { selected: true }));
    }
  };

  const modifiers = {
    thursdays: { daysOfWeek: [4] },
    birthday: new Date(2019, 6, 10)
  };
  const modifiersStyles = {
    birthday: {
      // color: "white",
      backgroundColor: "#ffc107"
    },
    thursdays: {
      // color: "#ffc107",
      // backgroundColor: "#fffdee"
    }
  };

  const [selectedChip, setSelectedChip] = useState();
  const [isChipSelected, setisChipSelected] = useState(false);
  const handleClickChip = (selectedChip, isFocused) => {
    isFocused ? setSelectedChip(selectedChip) : setSelectedChip("Nothing selected");
    setSelectedChip(selectedChip);
  };

  return (
    <Paper className={classes.root}>
      <DayPicker
        modifiers={modifiers}
        // disabledDays={new Date(2019, 7, 4)}
        modifiersStyles={modifiersStyles}
        showOutsideDays
        showWeekNumbers
        // todayButton="Back to Current Month"
        // onWeekClick={(week, days) => console.log(week, days)}
        numberOfMonths={1}
        selectedDays={dates.map(({ date }) => date)}
        onDayClick={handleCalendarClick}
        fixedWeeks
        firstDayOfWeek={1}
        onWeekClick={handleWeekClick}
      />
      {/* <button onClick={() => console.log(selectedChip)}>test</button> */}
      <ChipInput
        blurBehavior="add"
        value={dates.map(({ text }) => text.short)}
        onAdd={handleChipAdd}
        onDelete={handleChipDelete}
        fullWidth
        disableUnderline
        chipRenderer={({ value, isFocused, isDisabled, handleClick, handleDelete, className }, key) => (
          <Chip
            // clickable
            size="small"
            variant="outlined"
            key={key}
            className={className}
            style={{
              pointerEvents: isDisabled ? "none" : undefined,
              backgroundColor: selectedChip === value ? "#ffa6e0" : "#f2f2f2"
            }}
            // onClick={handleClick}
            onClick={() => {
              selectedChip !== value
                ? setSelectedChip(selectedChip => {
                    return value;
                  })
                : setSelectedChip(selectedChip => {
                    return undefined;
                  });
            }}
            onDelete={handleDelete}
            label={value}
            // icon={selectedChip !== value ? <EventIcon /> : <StarIcon style={{ color: "yellow" }} />}
            avatar={<Avatar size={50}>{value[3] + value[4]}</Avatar>}
          />
        )}
      />
      <br />
      <br />
      <br />
      <div>
        <div>Set as priority {selectedChip}</div>
        <div>Available Time</div>
        <div>Pre parse text</div>
      </div>
    </Paper>
  );
}

const userDateEntryParse = entry => {
  let dateTxt = entry;
  if (entry == null) {
    return "";
  }
  var re = new RegExp(/(\d{6})(\d{2})?/);
  if (isNaN(dateTxt)) {
    switch (dateTxt.toUpperCase()) {
      case "TODAY":
      case "TD":
        dateTxt = new Date();
        break;
      case "TM":
      case "TOMORROW":
      case "TOMMOROW":
      case "TOMMORROW":
        dateTxt = addDays(new Date(), 1);
        break;
      case "M":
      case "MON":
      case "MONDAY":
      case "THIS MONDAY":
      case "T M":
      case "T MON":
      case "THIS MON":
        return (dateTxt = weekday(1));
      case "T":
      case "T T":
      case "TUE":
      case "T TUE":
      case "THIS TUE":
      case "TUESDAY":
      case "THIS TUESDAY":
        return (dateTxt = weekday(2));
      case "W":
      case "WED":
      case "WEDNESDAY":
      case "THIS WEDNESDAY":
      case "T W":
      case "T WED":
      case "THIS WENDESDAY":
        return (dateTxt = weekday(3));
      case "TH":
      case "T TH":
      case "THU":
      case "T THU":
      case "THIS THU":
      case "THURSDAY":
      case "THIS THURSDAY":
        return (dateTxt = weekday(4));
      case "F":
      case "T F":
      case "FRI":
      case "T FRI":
      case "THIS FRI":
      case "FRIDAY":
      case "THIS FRIDAY":
        return (dateTxt = weekday(5));
      case "S":
      case "T S":
      case "SAT":
      case "T SAT":
      case "THIS SAT":
      case "SATURDAY":
      case "THIS SATURDAY":
        return (dateTxt = weekday(6));
      case "SN":
      case "T SN":
      case "SUN":
      case "T SUN":
      case "THIS SUN":
      case "SUNDAY":
      case "THIS SUNDAY":
        return (dateTxt = weekday(0));
      case "N SN":
      case "N SUN":
      case "N SUNDAY":
      case "NEXT SUN":
      case "NEXT SUNDAY":
        return (dateTxt = weekday(0, true));
      case "N M":
      case "N MON":
      case "N MONDAY":
      case "NEXT MON":
      case "NEXT MONDAY":
        return (dateTxt = weekday(1, true));
      case "N T":
      case "N TUE":
      case "N TUESDAY":
      case "NEXT TUE":
      case "NEXT TUESDAY":
        return (dateTxt = weekday(2, true));
      case "N W":
      case "N WED":
      case "N WEDNESDAY":
      case "NEXT WED":
      case "NEXT WEDNESDAY":
        return (dateTxt = weekday(3, true));
      case "N TH":
      case "N THU":
      case "N THURSDAY":
      case "NEXT THU":
      case "NEXT THURSDAY":
        return (dateTxt = weekday(4, true));
      case "N F":
      case "N FRI":
      case "N FRIDAY":
      case "NEXT FRI":
      case "NEXT FRIDAY":
        return (dateTxt = weekday(5, true));
      case "N S":
      case "N SAT":
      case "NEXT SAT":
      case "NEXT SATURDAY":
        return (dateTxt = weekday(6, true));
      case "JANUARY":
      case "FEBRUARY":
      case "MARCH":
      case "APRIL":
      case "MAY":
      case "JUNE":
      case "JULY":
      case "AUGUST":
      case "SEPTEMBER":
      case "OCTOBER":
      case "NOVEMBER":
      case "DECEMBER":
        return (dateTxt = new Date());
      default:
        console.log("Not a valid entry");
    }
  } else if (dateTxt.length <= 5 && dateTxt.length !== 0 && (dateTxt.charAt(0) === "+" || dateTxt.charAt(0) === "-")) {
    const fn = dateTxt.charAt(0) === "+" ? addDays : subDays;
    return (dateTxt = fn(new Date(), parseInt(dateTxt))); //If entry starts with "+" and is numbers, return date with added entry days
  } else if (re.test(dateTxt)) {
    if (dateTxt.length === 8) {
      dateTxt = dateTxt.substring(0, 2) + "/" + dateTxt.substring(2, 4) + "/" + dateTxt.substring(4, 8);
      console.log(dateTxt);

      dateTxt = parse(dateTxt, "MM/dd/yyyy", new Date());
      console.log(dateTxt);
    } else if (dateTxt.length === 6) {
      if (dateTxt.substring(4, 6) < 30) {
        dateTxt = dateTxt.substring(0, 2) + "/" + dateTxt.substring(2, 4) + "/20" + dateTxt.substring(4, 6);
      } else {
        dateTxt = dateTxt.substring(0, 2) + "/" + dateTxt.substring(2, 4) + "/19" + dateTxt.substring(4, 6);
      }
    }
  }
  return dateTxt;
};

const weekday = (weekDayNo, nextWeek) => {
  nextWeek = nextWeek || false;
  let dateTxt = setDay(new Date(), weekDayNo, { weekStartsOn: 1 });
  if (isPast(dateTxt) || isToday(dateTxt)) dateTxt = addWeeks(dateTxt, 1);
  if (nextWeek === true) {
    dateTxt = addWeeks(dateTxt, 1);
  } else {
  }
  return dateTxt;
};
//PRIORITY
// @TODO - Parse 7/15, 715, 07/15/2019, 7/15/19, 7/15/2019,
// @TODO - date priority - onDelete set priority to next oldest timestamp... or no, if it was set manually
// @TODO - clickable tooltip to show available times, priority, and preParse text
// @TODO - CSS STYLING

//FUTURE
// @TODO button to minimise calendar
// @TODO - FOCUS SQUARE REMOVALL
// @TODO - on big screens show to months
// @TODO - show year if more than 3 months away to next year
// @TODO - show if selected on next/prev month
// @TODO - show home month homebutton if not on home month
// @TODO - on mobile, swipe calendar to change months
// @TODO - end of the month, end of the next week, beginning of next week, next month, in 3 weeks, sometime next week, tuesday afternoon
// @TODO - get all master calendar data - to format colors - angie's idea
// @TODO - show transportation minimums

//DONE
// @---- - this XXX, this Friday vs next Friday
// @---- - on week click select all the days in the week
