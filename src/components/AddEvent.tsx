import React, { useState } from "react";
import styled from "styled-components";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

import ErrorField from "components/base/ErrorField";
import { createEventValidationRules } from "components/base/validationRules";
import Button from "components/base/Button";
import useForm from "./base/useForm";

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
    handleEventSubmit(e);
  };

  const [eventDateFocused, setEventDateFocused] = useState<boolean>(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit: handleEventSubmit
  } = useForm({
    submitCallback: submitEvent,
    validationRules: createEventValidationRules
  });
  /* eslint-enable @typescript-eslint/no-use-before-define */

  return (
    <PageContainer className="ornament__background">
      <Overlay className="overlay">
        <EventForm>
          <ErrorField
            name="event-title"
            title="Event title"
            placeholder="Event title"
            errors={errors}
            values={values}
            onChange={handleChange}
          />
          <ErrorField
            name="event-color"
            title="Color"
            placeholder="Event color"
            errors={errors}
            values={values}
            onChange={handleChange}
          />
          <SingleDatePicker
            date={moment()}
            onDateChange={date => {}}
            focused={eventDateFocused}
            onFocusChange={({ focused }) => setEventDateFocused(focused)}
            id="event_date"
          />
          <Button
            loadingState={false}
            onClick={handleEventSubmit}
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
            errors={errors}
            values={values}
            onChange={handleChange}
          />
        </RangeForm>
        {/* <Button /> */}
      </Overlay>
    </PageContainer>
  );
};

export default AddEvent;
