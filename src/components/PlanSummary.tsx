import React from 'react';
import { format } from 'date-fns'
import styled from 'styled-components';

interface Props {
    selectedPlan: AvailablePlan,
    endDate: Date,
}

const Root = styled.div`
    margin: 1em 0 .5em 0;
    padding: .5em 0 1em 0;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    background-color: #f8f9fa;
`

const PlanSummary: React.FC<Props> = ({ selectedPlan, endDate }) => {
    return (
        <Root>
            <h2>{selectedPlan.name}</h2>
            <h3>Ending on: {format(endDate, 'MM/dd/yyyy')}</h3>
        </Root>
    )
}

export default PlanSummary