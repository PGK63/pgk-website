import React, {useContext} from 'react';
import {Routes} from "react-router-dom";
import {AuthContext} from "../context";
import {
    adminRoutes,
    departmentHeadRoutes,
    deputyHeadmanRoutes, directorRoutes,
    educationalSectorRoutes,
    headmanRoutes,
    publicRoutes,
    studentRoutes,
    teacherRoutes
} from "../router";
import {UserRole} from "../api/user/model/UserRole";

const AppRouter = () => {

    const {user} = useContext(AuthContext);

    return (
        user !== null
            ? <Routes>
                {user.userRole === UserRole.student && studentRoutes.map(route => route)}
                {user.userRole === UserRole.deputyHeadman && deputyHeadmanRoutes.map(route => route)}
                {user.userRole === UserRole.headman && headmanRoutes.map(route => route)}
                {user.userRole === UserRole.teacher && teacherRoutes.map(route => route)}
                {user.userRole === UserRole.educationalSector && educationalSectorRoutes.map(route => route)}
                {user.userRole === UserRole.departmentHead && departmentHeadRoutes.map(route => route)}
                {user.userRole === UserRole.director && directorRoutes.map(route => route)}
                {user.userRole === UserRole.admin && adminRoutes.map(route => route)}
            </Routes>
            : <Routes>
                {publicRoutes.map(route => route)}
            </Routes>
    );
};

export default AppRouter;