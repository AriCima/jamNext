import React from 'react';
import { format } from 'date-fns/';

import { Div, Txt } from '../../styledComps';

const BookingsGraphic = ({ tenants }) => {

  const generateGraphicsMonths = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    const yyyy = Number(today.getFullYear());
    const cM = Number(today.getMonth()); // Current Month in numbers

    const oneYearArray = [];

    for (let s = cM; s <= 11; s++) {
      oneYearArray.push([months[s], yyyy]);
    }

    for (let s = 0; s < cM; s++) {
      oneYearArray.push([months[s], yyyy + 1]);
    }

    return oneYearArray.map((months, i) => {
      const isCurrent = i === 0;

      const backCol = isCurrent ? 'rgba(236, 236, 236, 1)' : 'white';
      return (
        <Div className="month-container"
          key={i}
          w="100px"
          col
          just="center"
          align="center"
          back="backCol"

        >
          <Div className="month-name"
            w="100px"
            h="20px"
            border="rgba(236, 236, 236, 1)"
            col
            just="center"
            align="center"
          >
            <Txt mg="0" fSize="12px">{months[0]}</Txt>
          </Div>
          <Div className="days-container"
                      w="100px"
                      h="10px"
                      mgT="2px"
                      mgB="2px"
                      mgL="0"
                      mgR="0"
                      border="rgba(236, 236, 236, 1)"
                      just="flex-start"
                      align="center"
          >
            {generateDays(months[0], months[1])}
          </Div>

        </Div>
      );
    });
  };

  const generateDays = (mm, yy) => { // x = 'Mes' y = yyyy
    if (tenants.length === 0) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const oneMonthArray = [];
    const today = new Date();

    const nrDays = daysOfMonth[months.indexOf(mm)];

    for (let d = 0; d < nrDays; d++) {
      // BRING DATE TO (dd-Mm-yyyy) format
      const oneDay = {};
      oneDay.day = d + 1;
      oneDay.month = mm;
      oneDay.year = yy;
      // default days style
      oneDay.dayType = 'vacant';
      oneDay.width = `${100 / nrDays}px`;
      oneDay.isToday = '';

      const dateToCompare = new Date(`${d + 1}-${mm}-${yy}`);

      // VERIFY: is oneDay between any check-in and check-out date ?
      for (let r = 0; r < tenants.length; r++) {
        const checkin = new Date(tenants[r].checkIn);
        const checkout = new Date(tenants[r].checkOut);

        if (dateToCompare >= checkin && dateToCompare <= checkout) { // styling BOOKED days
          oneDay.dayType = 'booked';
        }
      }

      const dayFormat = format(dateToCompare, 'dd');

      if (dayFormat === '01') oneDay.firstDay = 'isFirstDay';

      // STYLING "TODAY"
      const hoy = {};
      hoy.day = today.getDate();
      hoy.month = months[Number(today.getMonth())];
      hoy.year = today.getFullYear();

      if (oneDay.day === hoy.day && oneDay.month === hoy.month && oneDay.year === hoy.year) {
        oneDay.background = 'rgb(255,255,0)';
        oneDay.isToday = 'today';
      }

      oneMonthArray.push(oneDay);
    }

    return oneMonthArray.map((days, i) => {
      let backColor = '';

      switch (days.dayType) {
        case 'vacant':
          backColor = 'white';
          break;
        case 'booked':
          backColor = '#FCA311';
          break;
        case 'today':
          backColor = 'rgb(255,255,0)';
          break;
        default:
          backColor = 'white';
      }

      return (
        <Div
          className="days-container"
          w="100px"
          h="10px"
          mg="2px 0"
          just="flex-start"
          align="center"
          borderBot="rgba(236, 236, 236, 1)"
        >
          <Div
            className="single-day"
            key={i}
            style={{ width: days.width }}
            h="100%"
            back="backColor"
          />

        </Div>
      );
    });
  };

  return (
    <Div className="graphic-area"
      w="650px"
      flexW="wrap"
      just="center"
      align="center"
    >
      {generateGraphicsMonths()}
    </Div>
  );
};

export default BookingsGraphic;
