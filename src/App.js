import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import GroupsPage from "./pages/groups/GroupsPage";
import AuthPage from "./pages/auth/AuthPage";
import StudentsPage from "./pages/student/StudentsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import GroupDetailsPage from "./pages/groups/GroupDetailsPage";
import SpecialtiesPage from "./pages/speciality/SpecialityPage";
import SubjectsPage from "./pages/subject/SubjectPage";
import DepartmentsPage from "./pages/department/DepartmentsPage";
import SearchPage from "./pages/search/SearchPage";
import JournalsPage from "./pages/journal/JournalsPage";
import JournalSubjectsPage from "./pages/journal/JournalSubjectsPage";
import GuidePaige from "./pages/guide/GuidePaige";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import RegistrationPage from "./pages/registration/RegistrationPage";
import JournalTablePage from "./pages/journal/JournalTablePage";
import JournalTopicsPage from "./pages/journal/JournalTopicsPage";
import RaportichkaListPage from "./pages/raportichka/RaportichkaListPage";
import RaportichkaTable from "./pages/raportichka/RaportichkaTable";
import AddRaportichkaRowPage from "./pages/raportichka/AddRaportichkaRowPage";
import SettingsTelegram from "./pages/settingsTelegram/SettingsTelegram";
import CreateJournalPage from "./pages/journal/CreateJournalPage";
import JournalCreateTopicPage from "./pages/journal/JournalCreateTopicPage";
import JournalCreateSubjectPage from "./pages/journal/JournalCreateSubjectPage";
import CreateSpecialityPage from "./pages/speciality/CreateSpecialityPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/groups" element={<GroupsPage/>}/>
            <Route path="/groups/:id" element={<GroupDetailsPage/>}/>
            <Route path="/groups/:id/journal/create" element={<CreateJournalPage/>}/>
            <Route path="/students" element={<StudentsPage/>}/>
            <Route path="/specialties" element={<SpecialtiesPage/>}/>
            <Route path="/specialties/create" element={<CreateSpecialityPage/>}/>
            <Route path="/subjects" element={<SubjectsPage/>}/>
            <Route path="/departments" element={<DepartmentsPage/>}/>
            <Route path="/journals" element={<JournalsPage/>}/>
            <Route path="/journals/:journalId/subjects" element={<JournalSubjectsPage/>}/>
            <Route path="/journals/:journalId/subjects/create" element={<JournalCreateSubjectPage/>}/>
            <Route path="/journals/:journalId/subjects/:subjectId/table" element={<JournalTablePage/>}/>
            <Route path="/journals/:journalId/subjects/:subjectId/topics" element={<JournalTopicsPage/>}/>
            <Route path="/journals/:journalId/subjects/:subjectId/topics/create" element={<JournalCreateTopicPage/>}/>
            <Route path="/guide" element={<GuidePaige/>}/>
            <Route path="/password_reset" element={<PasswordReset/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/registration/:role" element={<RegistrationPage/>}/>
            <Route path="/raportichka/list" element={<RaportichkaListPage/>}/>
            <Route path="/raportichka/:id/table" element={<RaportichkaTable/>}/>
            <Route path="/raportichka/:id/table/row/add" element={<AddRaportichkaRowPage/>}/>
            <Route path="/settings/telegram" element={<SettingsTelegram/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
