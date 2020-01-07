import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

type ChartProps = {
  weeks: Week[];
  months: string[];
};

type WeekProps = {
  week: Week;
};

type Week = {
  days: Day[];
  id: number;
};

type Day = {
  id: number;
  color: string;
  title?: string;
};

const Container = styled.div`
  flex: 0 1 80rem;
  border: 1px solid #ffffff;
  padding: 2rem 3.5rem;
  padding-bottom: 3rem;
  display: grid;
  grid-template-columns: 3rem max-content;
  grid-template-rows: 2rem max-content;
`;

const MonthScale = styled.div`
  grid-column: 2 / 3;
  display: flex;
  margin-left: 1.5rem;
`;

const DaysScale = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1.8rem;

  p {
    flex: 1 1 1rem;
    font-size: 1.2rem;
    color: ${props => props.theme.textOnBlack};
  }
`;

const StyledMonth = styled.p`
  margin: 0;
  padding: 0;
  flex: 1 0 6rem;
  font-size: 1.2rem;
  color: ${props => props.theme.textOnBlack};
`;

const StyledWeeks = styled.div`
  display: grid;
  grid-template-columns: repeat(52, 1.2rem);
  grid-template-rows: 1fr;
  grid-gap: 4px;
  margin-left: 0.8rem;
`;

const StyledWeek = styled.div`
  display: grid;
  grid-template-columns: 1.2rem;
  grid-template-rows: repeat(7, 1.2rem);
  grid-gap: 4px;
`;

const StyledDay = styled.div<Day>`
  width: 1.2rem;
  height: 1.2rem;
  background: ${props => props.color};
`;

const Chart: React.FC<ChartProps> = ({ weeks, months }) => {
  return (
    <Container>
      <MonthScale>
        {months.map(month => (
          <StyledMonth key={month}>{month}</StyledMonth>
        ))}
      </MonthScale>
      <DaysScale>
        <p>Mon</p>
        <p>Wed</p>
        <p>Fri</p>
      </DaysScale>
      <StyledWeeks>
        {weeks.map((week: Week) => (
          <Week key={week.id} week={week} />
        ))}
      </StyledWeeks>
    </Container>
  );
};

const Week: React.FC<WeekProps> = ({ week }) => (
  <StyledWeek>
    {week.days.map(day => (
      <>
        <StyledDay
          key={day.id}
          color={day.color}
          data-for={day.id}
          data-tip={day.title}
        />
        <ReactTooltip id={day.id} />
      </>
    ))}
  </StyledWeek>
);

export default Chart;
