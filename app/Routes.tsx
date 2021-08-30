import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import routes from './constants/routes.json'
import HomePage from './containers/HomePage'
import WorkingDaysHoursView from './Pages/WorkingDaysHours/WorkingDaysAndHoursView'
import WorkingDaysHours from './Pages/WorkingDaysHours/WorkingDaysHours'
import WorkingDaysHoursEdit from './Pages/WorkingDaysHours/WorkingDaysHoursEdit'
import LecturersAddView from './Pages/Lecturers/lecturersAddView'
import LecturersEditView from './Pages/Lecturers/lecturersEditView'
import LecturersListView from './Pages/Lecturers/lecturersListView'
import SubjectsAddView from './Pages/Subjects/subjectsAddView'
import SubjectsEditView from './Pages/Subjects/subjectsEditView'
import SubjectsListView from './Pages/Subjects/subjectsListView'
import GroupsAdd from './Pages/Groups/groupsAdd'
import TagsAdd from './Pages/Tags/tagsAdd'
import TagsEdit from './Pages/Tags/tagsEdit'
import TagsListView from './Pages/Tags/tagsListView'
import GroupsListView from './Pages/Groups/groupsListView'
import GroupsListViewEdit from './Pages/Groups/groupsListViewEdit'
import GroupsSingleView from './Pages/Groups/groupsSingleView'
import SubGroupsSingleView from './Pages/Groups/subGroupsSingleView'
import GroupsEdit from './Pages/Groups/groupsEdit'
import YearSemsAdd from './Pages/YearSems/yearsemsAdd'
import YearSemsEdit from './Pages/YearSems/yearsemsEdit'
import YearSemsListView from './Pages/YearSems/yearsemsListView'
import GroupNumsListView from './Pages/GroupNum/groupNumsListView'
import GroupNumsAdd from './Pages/GroupNum/groupNumsAdd'
import GroupNumsEdit from './Pages/GroupNum/groupNumsEdit'
import SubGroupNumsListView from './Pages/SubGroupNum/subGroupNumsListView'
import SubGroupNumsAdd from './Pages/SubGroupNum/subGroupNumsAdd'
import SubGroupNumsEdit from './Pages/SubGroupNum/subGroupNumsEdit'
import ProgramsListView from './Pages/Programme/programsListView'
import ProgramsAdd from './Pages/Programme/programsAdd'
import ProgramsEdit from './Pages/Programme/programsEdit'
import ConsecutiveSessionsAdd from './Pages/ConsecutiveSession/consecutiveSessionsAdd'
import ConsecutiveSessionsAdd1 from './Pages/ConsecutiveSession1/consecutiveSessionsAdd'
import NotAvailablesPage from './Pages/NotAvailable/notAvailablesPage'
import ParallelSessionsPage from './Pages/ParallelSession/parallelSessionsPage'
import ParallelSessionsPage1 from './Pages/ParallelSession1/parallelSessionsPage'
import BuildingsPage from './Pages/Buildings/buildings-page'
import RoomsPage from './Pages/Rooms/rooms-page'
import LecturersStatisticsPage from './Pages/LecturersStatistics/lecturers-statistics-page'
import StudentsStatisticsPage from './Pages/StudentsStatistics/students-statistics-page'
import SubjectsStatisticsPage from './Pages/SubjectsStatistics/subjects-statistics-page'
import RoomsUnavailabilityPage from './Pages/RoomsUnavailability/rooms-unavailability-page'
import AddRoomsPage from './Pages/AddRooms/add-rooms-page'
import AssignRoomsForSessionsPage from './Pages/AssignRoomsForSessions/assign-rooms-for-sessions-page'
import TimetableScreen from './Pages/TimetableGenerate/TimetableScreen';
import ParallelCategoryPage from './Pages/ParallelCategory/parallelCategoryPage'
import SessionsAddView from './Pages/Sessions/sessionsAddView';
import SessionsListView from './Pages/Sessions/sessionsListView';

const LazyCounterPage = React.lazy(() =>
  import('./containers/CounterPage')
)

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
)

export default function Routes() {
  return (
    <App>
      <Switch>

        <Route path={routes.COUNTER}
               component={CounterPage}/>
        <Route path={routes.WORKING_DAYS_AND_HOURS_VIEW}
               component={WorkingDaysHoursView}/>
        <Route path={routes.WORKING_DAYS_AND_HOURS}
               component={WorkingDaysHours}/>
        <Route path={routes.WORKING_DAYS_AND_HOURS_Edit}
               component={WorkingDaysHoursEdit}/>
        <Route path={routes.LECTURERS_ADD}
               component={LecturersAddView}/>
        <Route path={routes.LECTURERS_EDIT}
               component={LecturersEditView}/>
        <Route path={routes.LECTURERS_LIST_VIEW}
               component={LecturersListView}/>
        <Route path={routes.SUBJECTS_ADD}
               component={SubjectsAddView}/>
        <Route path={routes.SUBJECTS_EDIT}
               component={SubjectsEditView}/>
        <Route path={routes.SUBJECTS_LIST_VIEW}
               component={SubjectsListView}/>
        <Route path={routes.SESSIONS_ADD}
               component={SessionsAddView}/>
        <Route path={routes.SESSIONS_LIST}
               component={SessionsListView}/>
        <Route path={routes.GROUPS_ADD}
               component={GroupsAdd}/>
        <Route path={routes.GROUPS_LIST_VIEW}
               component={GroupsListView}/>
        <Route path={routes.GROUPS_LIST_VIEW_EDIT}
               component={GroupsListViewEdit}/>
        <Route path={routes.GROUPS_EDIT}
               component={GroupsEdit}/>
        <Route path={routes.GROUPS_SINGLE_VIEW}
               component={GroupsSingleView}/>
        <Route path={routes.GROUPS_SINGLE_SUB_VIEW}
               component={SubGroupsSingleView}/>
        <Route path={routes.TAGS_ADD}
               component={TagsAdd}/>
        <Route path={routes.TAGS_EDIT}
               component={TagsEdit}/>
        <Route path={routes.TAGS_LIST_VIEW}
               component={TagsListView}/>
        <Route path={routes.YEARSEMS_ADD}
               component={YearSemsAdd}/>
        <Route path={routes.YEARSEMS_EDIT}
               component={YearSemsEdit}/>
        <Route path={routes.YEARSEMS_LIST_VIEW}
               component={YearSemsListView}/>
        <Route path={routes.GROUPNUMS_ADD}
               component={GroupNumsAdd}/>
        <Route path={routes.GROUPNUMS_EDIT}
               component={GroupNumsEdit}/>
        <Route path={routes.GROUPNUMS_LIST_VIEW}
               component={GroupNumsListView}/>
        <Route path={routes.SUBGROUPNUMS_ADD}
               component={SubGroupNumsAdd}/>
        <Route path={routes.SUBGROUPNUMS_EDIT}
               component={SubGroupNumsEdit}/>
        <Route path={routes.SUBGROUPNUMS_LIST_VIEW}
               component={SubGroupNumsListView}/>
        <Route path={routes.PROGRAMS_ADD}
               component={ProgramsAdd}/>
        <Route path={routes.PROGRAMS_EDIT}
               component={ProgramsEdit}/>
        <Route path={routes.PROGRAMS_LIST_VIEW}
               component={ProgramsListView}/>
        <Route path={routes.CONSECUTIVE_SESSIONS}
               component={ConsecutiveSessionsAdd}/>
        <Route path={routes.NOT_AVAILABLE_TIMES}
               component={NotAvailablesPage}/>
       <Route path={routes.PARALLEL_SESSIONS}
               component={ParallelSessionsPage}/>
       <Route path={routes.CATEGORY}
               component={ParallelCategoryPage}/>
               <Route path={routes.CONSECUTIVE_SESSIONS1}
               component={ConsecutiveSessionsAdd1}/>
         <Route path={routes.PARALLEL_SESSIONS1}
               component={ParallelSessionsPage1}/>
        <Route path={routes.BUILDINGS}
               component={BuildingsPage}/>
        <Route path={routes.ROOMS}
               component={RoomsPage}/>
        <Route path={routes.STATISTICS_OF_LECTURERS}
               component={LecturersStatisticsPage}/>
        <Route path={routes.STATISTICS_OF_STUDENTS}
               component={StudentsStatisticsPage}/>
        <Route path={routes.STATISTICS_OF_SUBJECTS}
               component={SubjectsStatisticsPage}/>
        <Route path={routes.ROOMS_UNAVAILABILITY}
               component={RoomsUnavailabilityPage}/>
        <Route path={routes.ADD_ROOMS}
               component={AddRoomsPage}/>
        <Route path={routes.ASSIGN_ROOMS_FOR_SESSIONS}
               component={AssignRoomsForSessionsPage}/>
        <Route path={routes.GENERATE_TIMETABLES}
               component={TimetableScreen}/>
        <Route path={routes.HOME}
               component={HomePage}/>
      </Switch>
    </App>
  )
}
