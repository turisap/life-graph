import React, { useState } from "react";
import styled from "styled-components";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import ErrorField, { ErrorFieldWrapper } from "components/base/ErrorField";
import { createEventValidationRules } from "components/base/validationRules";
import Button from "components/base/Button";

import useForm from "./base/useForm";
import { setEventDate } from "../redux/ducks/events";
import { RootState } from "../types";

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
  height: 30rem;

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
  const submitEvent = e => {
    eventHandleSubmit(e);
  };

  const [eventDateFocused, setEventDateFocused] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    values: eventValues,
    errors: eventErrors,
    handleChange: eventHandleChange,
    handleSubmit: eventHandleSubmit
  } = useForm({
    submitCallback: submitEvent,
    validationRules: createEventValidationRules
  });
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const toggleFocus = () => setEventDateFocused(!eventDateFocused);
  const setEventDateToRedux = date => dispatch(setEventDate(date));
  const event = useSelector((state: RootState) => state.events.event);

  return (
    <PageContainer className="ornament__background">
      <Overlay className="overlay">
        <EventForm>
          <ErrorField
            name="event-title"
            title="Event title"
            placeholder="Event title"
            errors={eventErrors}
            values={eventValues}
            onChange={eventHandleChange}
          />
          <ErrorField
            name="event-color"
            title="Color"
            placeholder="Event color"
            errors={eventErrors}
            values={eventValues}
            onChange={eventHandleChange}
          />
          <ErrorFieldWrapper
            onClickHandler={toggleFocus}
            render={() => (
              <SingleDatePicker
                date={event.date}
                onDateChange={setEventDateToRedux}
                focused={eventDateFocused}
                onFocusChange={toggleFocus}
                id="event_date"
                noBorder={true}
                showClearDate
                numberOfMonths={1}
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
        <RangeForm>
          <ErrorField
            name="range-title"
            title="Range title"
            placeholder="Range title"
            errors={{}}
            values={{}}
            onChange={() => {}}
          />
        </RangeForm>
        {/* <Button /> */}
      </Overlay>
    </PageContainer>
  );
};

export default AddEvent;
