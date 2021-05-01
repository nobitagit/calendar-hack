import * as React from 'react'
import { key } from '../ch/dategrid'
import { DayCell } from './DayCell'
import { WeekSummary } from './WeekSummary'
import { DayOfWeekHeader } from './DayOfWeekHeader'
import styled from 'styled-components'
import { format } from 'date-fns'

interface Props {
    racePlan: RacePlan,
    units: Units,
    swap: (d1: Date, d2: Date) => void,
    swapDow: (dow1: dayOfWeek, dow2: dayOfWeek) => void,
    swapWeeks: (w1: number, w2: number) => void,
}

const Root = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    row-gap: .5em;
`;

const WeekRow = styled.div`
    display: grid;
    @media (min-width: ${(props) => props.theme.screenSizes.lg}) {
        grid-template-columns: .75fr repeat(7, 1fr);
    }
    column-gap: .5em;
`

const Blank = styled.div`
`

function calcWeeklyDistance(w: Week<DayDetails>): number {
    return w.days.map(d => d.event).reduce((a, e) => { return (!e || !e.dist) ? a : a + e.dist }, 0);
}

function findMaxDistance(weeks: Week<DayDetails>[]): number {
    let currMax = 0.0;
    for (var i = 0; i < weeks.length; i++) {
        let d = calcWeeklyDistance(weeks[i]);
        if (d > currMax) {
            currMax = d;
        }
    }
    return currMax;
}

export const CalendarGrid: React.FC<Props> = ({ racePlan, units, swap, swapDow, swapWeeks }) => {
    const [selectedDow, setSelectedDow] = React.useState<dayOfWeek | undefined>(undefined);
    const [hoveringDow, setHoveringDow] = React.useState<dayOfWeek | undefined>(undefined);
    const maxDistance = findMaxDistance(racePlan.dateGrid.weeks);

    function getWeek(w: Week<DayDetails>) {
        return <WeekRow key={`wr:${w.weekNum}`}>
            <WeekSummary key={`ws:${w.weekNum}`}
                desc={w.desc}
                week={w}
                units={units}
                racePlan={racePlan}
                isFirstWeek={w.weekNum === 0}
                isLastWeek={w.weekNum === racePlan.dateGrid.weekCount - 1}
                isHighestMileage={maxDistance > 0 && calcWeeklyDistance(w) === maxDistance}></WeekSummary>
            {
                w.days.map((d, index) => (
                    <DayCell
                        key={key(d.date)}
                        date={d.date}
                        units={units}
                        swap={swap}
                        dayDetails={d.event}
                        selected={(selectedDow === format(d.date, 'EEEE'))}
                        hovering={hoveringDow === format(d.date, 'EEEE')}
                    />))
            }
        </WeekRow >
    }

    function getHeader() {
        return <WeekRow>
            <Blank key={'blank-left'} />
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((dow, index) => (
                <DayOfWeekHeader key={dow} dow={dow as dayOfWeek} swapDow={swapDow} selectDow={setSelectedDow} hoverDow={setHoveringDow} />
            ))}
        </WeekRow>;
    }

    return (
        <Root>
            {getHeader()}
            {racePlan.dateGrid.weeks.map((w, index) => (
                getWeek(w)
            ))}
        </Root>
    )
}
