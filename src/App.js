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

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/groups" element={<GroupsPage/>}/>
            <Route path="/groups/:id" element={<GroupDetailsPage/>}/>
            <Route path="/students" element={<StudentsPage/>}/>
            <Route path="/specialties" element={<SpecialtiesPage/>}/>
            <Route path="/subjects" element={<SubjectsPage/>}/>
            <Route path="/departments" element={<DepartmentsPage/>}/>
            <Route path="/journals" element={<JournalsPage/>}/>
            <Route path="/journals/:journalId/subjects" element={<JournalSubjectsPage/>}/>
            <Route path="/guide" element={<GuidePaige/>}/>

            <Route path="/search" element={<SearchPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
