type Units = 'mi' | 'km'

type RaceType = "Marathon" | "Half Marathon" | "5K" | "10K"

interface PlanDates {
    start: Date, // first monday of first week we will render
    planStartDate: Date, // day the race plan will start
    planEndDate: Date, // day the race plan will end
    end: Date,   // last sunday of the last week we will render
    weekCount: number
}

type dayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
interface Day<T> { date: Date, event: T | undefined }
interface Week<T> { weekNum: number, dist: number, desc: string, days: Day<T>[] }

type Tags = 'Rest' | 'Run' | 'Cross Train' | 'Hills' | 'Speedwork' | 'Long Run' | 'Race'

interface DayDetails {
    title: string,
    desc: string,
    tags: Tags[],
    dist: number,
    sourceUnits: Units,
}

// Race plan is a TrainingPlan rendered for a specific goal race day plus all of the various
// customizations applied to it by an end user.
interface RacePlan {
    planDates: PlanDates,
    raceType: RaceType,
    dateGrid: import("./ch/dategrid").DateGrid<DayDetails>,
    sourceUnits: Units,
    description: string,
    sourceUrl: string,
}

type RaceDistance = {
    name: string,
    distance: number,
    worldRecord: number,
    defaultTime: number,
}

type Milestone = {
    name: string,
    distance: number,
}

interface AvailablePlan {
    url: string,
    id: string,
    name: string,
    type: RaceType
}

interface PlannedWorkout {
    title: string;
    description: string;
    tags: Tags[];
    distance: number;
    units: Units;
}

interface WeekSchedule {
    description: string | undefined,
    workouts: PlannedWorkout[], // guaranteed to be length 7
}

interface TrainingPlan {
    id: string,
    name: string,
    description: string,
    units: Units,
    type: RaceType,
    schedule: WeekSchedule[],
    source: string,
}
