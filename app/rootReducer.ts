import { combineReducers } from 'redux';
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import workingDaysHoursReducer from './Pages/WorkingDaysHours/workingDaysHoursSlice'
import lecturersReducer from './Pages/Lecturers/lecturersSlice'
import subjectsReducer from './Pages/Subjects/subjectsSlice'
import groupsReducer from './Pages/Groups/groupsSlice'
import tagsReducer from './Pages/Tags/tagsSlice'
import groupNumsReducer from './Pages/GroupNum/groupNumsSlice'
import subGroupNumsReducer from './Pages/SubGroupNum/subGroupNumsSlice'
import programsReducer from './Pages/Programme/programsSlice'
import yearSemsReducer from './Pages/YearSems/yearsemsSlice'
import buildingsReducer from './Pages/Buildings/buildings-slice'
import roomsReducer from './Pages/Rooms/rooms-slice'
import lecturersStatisticsReducer from './Pages/LecturersStatistics/lecturers-statistics-slice'
import studentsStatisticsReducer from './Pages/StudentsStatistics/students-statistics-slice'
import subjectsStatisticsReducer from './Pages/SubjectsStatistics/subjects-statistics-slice'
import roomsUnavailabilityReducer from './Pages/RoomsUnavailability/rooms-unavailability-slice'
import addRoomsReducer from './Pages/AddRooms/add-rooms-slice'
import sessionsReducer from './Pages/Sessions/sessionsSlice'
import assignRoomsForSessionsReducer from './Pages/AssignRoomsForSessions/assign-rooms-for-sessions-slice'
import consecutiveSessionsReducer from './Pages/ConsecutiveSession/consecutiveSessionsSlice'
import notAvailablesReducer from './Pages/NotAvailable/notAvailablesSlice'
import parallelSessionsReducer from './Pages/ParallelSession/ParallelSessionsSlice'
import parallelCategorysReducer from './Pages/ParallelCategory/ParallelCategorySlice'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    workingDaysHours: workingDaysHoursReducer,
    lecturers: lecturersReducer,
    subjects: subjectsReducer,
    groups: groupsReducer,
    tags: tagsReducer,
    programs: programsReducer,
    groupNums: groupNumsReducer,
    subGroupNums: subGroupNumsReducer,
    yearSems: yearSemsReducer,
    buildings: buildingsReducer,
    rooms: roomsReducer,
    lecturersStatistics: lecturersStatisticsReducer,
    studentsStatistics: studentsStatisticsReducer,
    subjectsStatistics: subjectsStatisticsReducer,
    roomsUnavailability: roomsUnavailabilityReducer,
    addRooms: addRoomsReducer,
    assignRoomsForSessions: assignRoomsForSessionsReducer,
    consecutiveSessions: consecutiveSessionsReducer,
    notAvailables: notAvailablesReducer,
    parallelSessions: parallelSessionsReducer,
    parallelCategorys: parallelCategorysReducer,
    sessions: sessionsReducer
  })
}
