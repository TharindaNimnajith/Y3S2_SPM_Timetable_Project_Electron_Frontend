import React from 'react'
import {NavLink} from 'react-router-dom'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import routes from '../../constants/routes.json'

const NavBar: React.FC = () => {
  return (
    <Navbar collapseOnSelect
            expand={false}
            bg='dark'
            variant='dark'
            style={{
              position: 'absolute',
              zIndex: 2,
              top: '7px'
            }}>
      <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto float-left'
             style={{
               height: '100vh'
             }}>
          <br/>
          <NavLink to={routes.WORKING_DAYS_AND_HOURS}>
            <Nav.Link href='#working-days-and-hours'>
              Working Days and Hours
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.LECTURERS_LIST_VIEW}>
            <Nav.Link href='#lecturers'>Lecturers</Nav.Link>
          </NavLink>
          <NavLink to={routes.SUBJECTS_LIST_VIEW}>
            <Nav.Link href='#subjects'>Subjects</Nav.Link>
          </NavLink>
          <NavLink to={routes.SESSIONS_LIST}>
            <Nav.Link href='#sessions'>Sessions</Nav.Link>
          </NavLink>
          <NavDropdown title='Batches Basic Info'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#batches/yearsems'>
              <NavLink to={routes.YEARSEMS_LIST_VIEW}>
                <Nav.Link href='#yearsems'
                          style={{
                            color: 'black'
                          }}>
                  Academic Year & Semesters
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#batches/programmes'>
              <NavLink to={routes.PROGRAMS_LIST_VIEW}>
                <Nav.Link href='#programmes'
                          style={{
                            color: 'black'
                          }}>
                  Programmes
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#batches/groups'>
              <NavLink to={routes.GROUPNUMS_LIST_VIEW}>
                <Nav.Link href='#groups'
                          style={{
                            color: 'black'
                          }}>
                  Groups
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#batches/subgroups'>
              <NavLink to={routes.SUBGROUPNUMS_LIST_VIEW}>
                <Nav.Link href='#subgroups'
                          style={{
                            color: 'black'
                          }}>
                  Sub Groups
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavLink to={routes.GROUPS_LIST_VIEW}>
            <Nav.Link href='#groups'>
              Student Batches
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.TAGS_LIST_VIEW}>
            <Nav.Link href='#tags'>
              Tags
            </Nav.Link>
          </NavLink>
          <NavDropdown title='Special Sessions'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#batches/consecutiveSessions'>
              <NavLink to={routes.CONSECUTIVE_SESSIONS}>
                <Nav.Link href='#consecutiveSessions'
                          style={{
                            color: 'black'
                          }}>
                  Add Consecutive Sessions
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#batches/notavailableTimes'>
              <NavLink to={routes.NOT_AVAILABLE_TIMES}>
                <Nav.Link href='#notavailableTimes'
                          style={{
                            color: 'black'
                          }}>
                  Allocate Not Available Times
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#batches/categorys'>
              <NavLink to={routes.CATEGORY}>
                <Nav.Link href='#categorys'
                          style={{
                            color: 'black'
                          }}>
                  Add Module for Category
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#batches/parallelSessions'>
              <NavLink to={routes.PARALLEL_SESSIONS}>
                <Nav.Link href='#parallelSessions'
                          style={{
                            color: 'black'
                          }}>
                  Add Parallel Session
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Special Sessions(opt)'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#batches/consecutiveSessions1'>
              <NavLink to={routes.CONSECUTIVE_SESSIONS1}>
                <Nav.Link href='#consecutiveSessions1'
                          style={{
                            color: 'black'
                          }}>
                  Add Consecutive Sessions(O)
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>


            <NavDropdown.Item href='#batches/parallelSessions1'>
              <NavLink to={routes.PARALLEL_SESSIONS1}>
                <Nav.Link href='#parallelSessions1'
                          style={{
                            color: 'black'
                          }}>
                  Add Parallel Session(O)
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Locations'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#locations/buildings'>
              <NavLink to={routes.BUILDINGS}>
                <Nav.Link href='#buildings'
                          style={{
                            color: 'black'
                          }}>
                  Buildings
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#locations/rooms'>
              <NavLink to={routes.ROOMS}>
                <Nav.Link href='#rooms'
                          style={{
                            color: 'black'
                          }}>
                  Rooms
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Statistics'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#statistics/statistics-of-lecturers'>
              <NavLink to={routes.STATISTICS_OF_LECTURERS}>
                <Nav.Link href='#statistics-of-lecturers'
                          style={{
                            color: 'black'
                          }}>
                  Statistics of Lecturers
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#statistics/statistics-of-subjects'>
              <NavLink to={routes.STATISTICS_OF_SUBJECTS}>
                <Nav.Link href='#statistics-of-subjects'
                          style={{
                            color: 'black'
                          }}>
                  Statistics of Subjects
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#statistics/statistics-of-students'>
              <NavLink to={routes.STATISTICS_OF_STUDENTS}>
                <Nav.Link href='#statistics-of-lecturers'
                          style={{
                            color: 'black'
                          }}>
                  Statistics of Students
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavLink to={routes.ROOMS_UNAVAILABILITY}>
            <Nav.Link href='#rooms-unavailability'>
              Rooms Unavailability
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ADD_ROOMS}>
            <Nav.Link href='#add-rooms'>
              Add Preferred Rooms
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ASSIGN_ROOMS_FOR_SESSIONS}>
            <Nav.Link href='#assign-rooms-for-sessions'>
              Assign Rooms for Sessions
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.GENERATE_TIMETABLES}>
            <Nav.Link href='#generate_timetables'>
              Generate Timetables
            </Nav.Link>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
