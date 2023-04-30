import AuthPage from "../pages/auth/AuthPage";
import PasswordReset from "../pages/passwordReset/PasswordReset";
import MainPage from "../pages/main/MainPage";
import {Route} from "react-router-dom";
import React from "react";
import ProfilePage from "../pages/profile/ProfilePage";
import GroupsPage from "../pages/groups/GroupsPage";
import GuidePaige from "../pages/guide/GuidePaige";
import SearchPage from "../pages/search/SearchPage";
import SettingsTelegram from "../pages/settingsTelegram/SettingsTelegram";
import SubjectsPage from "../pages/subject/SubjectPage";
import DepartmentsPage from "../pages/department/DepartmentsPage";
import JournalsPage from "../pages/journal/JournalsPage";
import JournalSubjectsPage from "../pages/journal/JournalSubjectsPage";
import StudentsPage from "../pages/student/StudentsPage";
import SpecialtiesPage from "../pages/speciality/SpecialityPage";
import RaportichkaListPage from "../pages/raportichka/RaportichkaListPage";
import RaportichkaTable from "../pages/raportichka/RaportichkaTable";
import GroupDetailsPage from "../pages/groups/GroupDetailsPage";
import JournalTablePage from "../pages/journal/JournalTablePage";
import JournalTopicsPage from "../pages/journal/JournalTopicsPage";
import CreateGroupPage from "../pages/groups/CreateGroupPage";
import CreateJournalPage from "../pages/journal/CreateJournalPage";
import CreateSpecialityPage from "../pages/speciality/CreateSpecialityPage";
import CreateDepartmentPage from "../pages/department/CreateDepartmentPage";
import JournalCreateSubjectPage from "../pages/journal/JournalCreateSubjectPage";
import JournalCreateTopicPage from "../pages/journal/JournalCreateTopicPage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import AddRaportichkaRowPage from "../pages/raportichka/AddRaportichkaRowPage";
import SettingsEmail from "../pages/settingsEmail/SettingsEmail";
import SettingsPage from "../pages/settings/SettingsPage";

export const privateRoutes = [
    <Route path="/" element={<MainPage/>}/>,
    <Route path="/profile" element={<ProfilePage/>}/>,
    <Route path="/groups" element={<GroupsPage/>}/>,
    <Route path="/guide" element={<GuidePaige/>}/>,
    <Route path="/search" element={<SearchPage/>}/>,
    <Route path="/settings/telegram" element={<SettingsTelegram/>}/>,
    <Route path="/settings/email" element={<SettingsEmail/>}/>,
    <Route path="/settings" element={<SettingsPage/>}/>,
    <Route path="/subjects" element={<SubjectsPage/>}/>,
    <Route path="/departments" element={<DepartmentsPage/>}/>,
    <Route path="/journals" element={<JournalsPage/>}/>,
    <Route path="/journals/:journalId/subjects" element={<JournalSubjectsPage/>}/>,
    <Route path="/students" element={<StudentsPage/>}/>,
    <Route path="/specialties" element={<SpecialtiesPage/>}/>,
    <Route path="/raportichka/list" element={<RaportichkaListPage/>}/>,
    <Route path="/raportichka/:id/table" element={<RaportichkaTable/>}/>,
    <Route path="/groups/:id" element={<GroupDetailsPage/>}/>,
    <Route path="/journals/:journalId/subjects/:subjectId/table" element={<JournalTablePage/>}/>,
    <Route path="/journals/:journalId/subjects/:subjectId/topics" element={<JournalTopicsPage/>}/>
]

export const adminRoutes = [
    ...privateRoutes,
    <Route path="/groups/create" element={<CreateGroupPage/>}/>,
    <Route path="/groups/:id/journal/create" element={<CreateJournalPage/>}/>,
    <Route path="/specialties/create" element={<CreateSpecialityPage/>}/>,
    <Route path="/departments/create" element={<CreateDepartmentPage/>}/>,
    <Route path="/journals/:journalId/subjects/:subjectId/topics/create" element={<JournalCreateTopicPage/>}/>,
    <Route path="/registration/:role" element={<RegistrationPage/>}/>,
    <Route path="/raportichka/:id/table/row/add" element={<AddRaportichkaRowPage/>}/>
]

export const directorRoutes = [
    ...privateRoutes
]

export const departmentHeadRoutes = [
    ...privateRoutes,
    <Route path="/specialties/create" element={<CreateSpecialityPage/>}/>,
    <Route path="/departments/create" element={<CreateDepartmentPage/>}/>,
]

export const educationalSectorRoutes = [
    ...privateRoutes,
    <Route path="/groups/:id/journal/create" element={<CreateJournalPage/>}/>,
    <Route path="/specialties/create" element={<CreateSpecialityPage/>}/>,
    <Route path="/departments/create" element={<CreateDepartmentPage/>}/>,
    <Route path="/registration/:role" element={<RegistrationPage/>}/>,
]

export const teacherRoutes = [
    ...privateRoutes,
    <Route path="/groups/create" element={<CreateGroupPage/>}/>,
    <Route path="/groups/:id/journal/create" element={<CreateJournalPage/>}/>,
    <Route path="/journals/:journalId/subjects/create" element={<JournalCreateSubjectPage/>}/>,
    <Route path="/journals/:journalId/subjects/:subjectId/topics/create" element={<JournalCreateTopicPage/>}/>,
    <Route path="/registration/:role" element={<RegistrationPage/>}/>,
    <Route path="/raportichka/:id/table/row/add" element={<AddRaportichkaRowPage/>}/>
]

export const headmanRoutes = [
    ...privateRoutes,
    <Route path="/raportichka/:id/table/row/add" element={<AddRaportichkaRowPage/>}/>
]

export const deputyHeadmanRoutes = [
    ...privateRoutes,
    <Route path="/raportichka/:id/table/row/add" element={<AddRaportichkaRowPage/>}/>
]

export const studentRoutes = [
    ...privateRoutes
]


export const publicRoutes = [
    <Route path="/auth" element={<AuthPage/>}/>,
    <Route path="/password_reset" element={<PasswordReset/>}/>
]