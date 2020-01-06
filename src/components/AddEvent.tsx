import React, { useState } from "react";
import styled from "styled-components";
import { SingleDatePicker } from "react-dates";
import { useDispatch } from "react-redux";
import moment, { Moment } from "moment";

import ErrorField, { ErrorFieldWrapper } from "components/base/ErrorField";
import Button from "components/base/Button";

import useForm from "./base/useForm";
import { postEventToFirestore } from "../redux/ducks/events";
import { Event } from "../types";
import {
  createEventValidationRules,
  createRangeValidationRules
} from "../lib/validationRules";

const PageContainer = styled.div``;

const Overlay = styled.div`
  display: flex;
`;

const EventForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 0 1 40rem;
  background: ${props => props.theme.whiteBackground};
  margin-right: 1.5rem;
  border-radius: 0.8rem;
  height: 48rem;

  button {
    margin-top: auto;
    align-self: flex-end;
  }
`;
const RangeForm = styled(EventForm)`
  margin-left: 1.5rem;
`;

const AddEvent = () => {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  const [eventDateFocused, setEventDateFocused] = useState<boolean>(false);
  const [startDateFocused, setStartDateFocused] = useState<boolean>(false);
  const [endDateFocused, setEndDateFocused] = useState<boolean>(false);
  const [eventDate, setEventDate] = useState<Moment>();
  const [rangeStartDate, setRangeStartDate] = useState<Moment>();
  const [rangeEndDate, setRangeEndDate] = useState<Moment>();
  const dispatch = useDispatch();

  const toggleFocus = ({ focused }) => setEventDateFocused(focused);
  const toggleStartFocus = ({ focused }) => setStartDateFocused(focused);
  const toggleEndFocus = ({ focused }) => setEndDateFocused(focused);

  const submitEvent = (values: Event) => {
    dispatch(postEventToFirestore.started(values));
  };

  const submitRange = values => {
    console.log(values);
  };

  const changeDate = (value: Moment) => {
    setEventDate(value);
    eventHandleChange({
      target: {
        name: "eventDate",
        value: value
      }
    });
  };

  const changeRangeDates = (name: "startDate" | "endDate") => (
    value: Moment
  ) => {
    if (name === "startDate") {
      setRangeStartDate(value);
    }
    if (name === "endDate") {
      setRangeEndDate(value);
    }
    rangeHandleChange({
      target: {
        name,
        value
      }
    });
  };

  const {
    values: eventValues,
    errors: eventErrors,
    handleChange: eventHandleChange,
    handleSubmit: eventHandleSubmit
  } = useForm({
    submitCallback: submitEvent,
    validationRules: createEventValidationRules
  });

  const {
    values: rangeValues,
    errors: rangeErrors,
    handleChange: rangeHandleChange,
    handleSubmit: rangeHandleSubmit
  } = useForm({
    submitCallback: submitRange,
    validationRules: createRangeValidationRules
  });
  /* eslint-enable @typescript-eslint/no-use-before-define */

  return (
    <PageContainer className="ornament__background">
      <Overlay className="overlay">
        <EventForm autocomplete="off">
          <ErrorField
            name="eventTitle"
            title="Event title"
            placeholder="Event title"
            errors={eventErrors}
            values={eventValues}
            onChange={eventHandleChange}
          />
          <ErrorField
            name="eventColor"
            title="Color"
            placeholder="Event color"
            errors={eventErrors}
            values={eventValues}
            onChange={eventHandleChange}
          />
          <ErrorFieldWrapper
            render={() => (
              <SingleDatePicker
                date={eventDate}
                onDateChange={changeDate}
                focused={eventDateFocused}
                onFocusChange={toggleFocus}
                numberOfMonths={1}
                id="eventDate"
                noBorder
                block
              />
            )}
            name="eventDate"
            title="Event date"
            errors={eventErrors}
          />
          <Button
            loadingState={false}
            onClick={eventHandleSubmit}
            width={15}
            height={4}
            fontSize={1.6}
            text="Add event"
          />
        </EventForm>
        <RangeForm autocomplete="off">
          <ErrorField
            name="rangeTitle"
            title="Range title"
            placeholder="Range title"
            errors={rangeErrors}
            values={rangeValues}
            onChange={rangeHandleChange}
          />
          <ErrorField
            name="rangeColor"
            title="Range Color"
            placeholder="Range color"
            errors={rangeErrors}
            values={rangeValues}
            onChange={rangeHandleChange}
          />
          <ErrorFieldWrapper
            render={() => (
              <SingleDatePicker
                date={rangeStartDate}
                onDateChange={changeRangeDates("startDate")}
                focused={startDateFocused}
                placeholder="Start date"
                onFocusChange={toggleStartFocus}
                numberOfMonths={1}
                id="rangeStart"
                noBorder
                block
              />
            )}
            name="startDate"
            title="Range start date"
            errors={rangeErrors}
          />
          <ErrorFieldWrapper
            render={() => (
              <SingleDatePicker
                date={rangeEndDate}
                onDateChange={changeRangeDates("endDate")}
                isDayBlocked={day => day.isSameOrBefore(rangeStartDate)}
                focused={endDateFocused}
                placeholder="End date"
                onFocusChange={toggleEndFocus}
                numberOfMonths={1}
                id="rangeEnd"
                noBorder
                block
              />
            )}
            name="endDate"
            title="Range end date"
            errors={rangeErrors}
          />
          <Button
            onClick={rangeHandleSubmit}
            text="Add range"
            loadingState={false}
            width={15}
            height={4}
            fontSize={1.6}
          />
        </RangeForm>
      </Overlay>
    </PageContainer>
  );
};

export default AddEvent;
