/**
 * Custom Calendar
 */
import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {DatePicker, DateTimePicker, DateRangePicker, DateTimeRangePicker} from "react-advance-jalaali-datepicker";

// events
import events from './events';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
class Rendering extends React.Component{
  change(unix, formatted){
    console.log(unix) // returns timestamp of the selected value, for example.
    console.log(formatted) // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
}
DatePickerInput(props) {
    return <input className="popo" {...props} ></input>;
}
render () {
  return (
    <div className="datePicker">
                  <DatePicker
                    inputComponent={this.DatePickerInput}
                    placeholder="انتخاب تاریخ"
                    format="jYYYY/jMM/jDD"
                    onChange={this.change}
                    id="datePicker"
                    preSelected="1396/05/15"
                    />
                <DateTimePicker
                    placeholder="انتخاب تاریخ و ساعت"
                    format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
                    id="dateTimePicker"
                    onChange={this.changeTimeDate}
                    preSelected="تاریخ: 1396/02/24 ساعت: 18:30"
                    />
                <DateRangePicker
                    placeholderStart="تاریخ شروع"
                    placeholderEnd="تاریخ پایان"
                    format="jYYYY/jMM/jDD"
                    onChangeStart={this.change}
                    onChangeEnd={this.changeTimeDate}
                    idStart="rangePickerStart"
                    idEnd="rangePickerEnd"
                    />
                <DateTimeRangePicker
                    placeholderStart="تاریخ و ساعت شروع"
                    placeholderEnd="تاریخ و ساعت پایان"
                    format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
                    onChangeStart={this.change}
                    onChangeEnd={this.changeTimeDate}
                    idStart="rangePickerStart"
                    idEnd="rangePickerEnd" />
              </div>
  )
}
}
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}

const customDayPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
      },
    }
  else return {}
}

const customSlotPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
    }
  else return {}
}

// let Rendering = ({ match }) => (
//   <div className="calendar-wrapper">
//      <div className="datePicker">
//                   <DatePicker
//                     inputComponent={this.DatePickerInput}
//                     placeholder="انتخاب تاریخ"
//                     format="jYYYY/jMM/jDD"
//                     onChange={this.change}
//                     id="datePicker"
//                     preSelected="1396/05/15"
//                     />
//                 <DateTimePicker
//                     placeholder="انتخاب تاریخ و ساعت"
//                     format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
//                     id="dateTimePicker"
//                     onChange={this.changeTimeDate}
//                     preSelected="تاریخ: 1396/02/24 ساعت: 18:30"
//                     />
//                 <DateRangePicker
//                     placeholderStart="تاریخ شروع"
//                     placeholderEnd="تاریخ پایان"
//                     format="jYYYY/jMM/jDD"
//                     onChangeStart={this.change}
//                     onChangeEnd={this.changeTimeDate}
//                     idStart="rangePickerStart"
//                     idEnd="rangePickerEnd"
//                     />
//                 <DateTimeRangePicker
//                     placeholderStart="تاریخ و ساعت شروع"
//                     placeholderEnd="تاریخ و ساعت پایان"
//                     format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
//                     onChangeStart={this.change}
//                     onChangeEnd={this.changeTimeDate}
//                     idStart="rangePickerStart"
//                     idEnd="rangePickerEnd" />
//               </div>
//     <PageTitleBar title={<IntlMessages id="sidebar.customRendering" />} match={match} />
//     <RctCollapsibleCard
//       heading="Custom Rendering"
//     >
//       <BigCalendar
//         events={events}
//         defaultDate={new Date(2015, 3, 12)}
//         defaultView="agenda"
//         dayPropGetter={customDayPropGetter}
//         slotPropGetter={customSlotPropGetter}
//         components={{
//           event: Event,
//           agenda: {
//             event: EventAgenda,
//           },
//         }}
//       />
//     </RctCollapsibleCard>
//   </div>
// )

export default Rendering
