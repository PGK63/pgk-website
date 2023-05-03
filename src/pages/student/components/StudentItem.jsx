import React, {useEffect, useState} from 'react';
import GroupService from '../../../api/group/GroupService';
import profilePhotoIcon from '../../../resources/icons/profile_photo.png';
import UserService from "../../../api/user/UserService";
import MainMenu from "../../../components/menu/MainMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {StyledMenu} from "../../../components/menu/StyledMenu";
import MenuItem from "@mui/material/MenuItem";

const StudentItem = (props) => {

    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {setAnchorEl(null);};

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect( () => {
        const photoUrl = props.student.photoUrl

        setName(UserService.getFIOFull(props.student))

        if(photoUrl === null){
            setIcon(profilePhotoIcon)
        }else {
            setIcon(photoUrl)
        }
    }, [props.student])

    return (
        <div>
            <div className="content">
            <div className="card" style={{width: "18rem"}}>


                <img src={icon} className="card-img-top"/>
                <div className="card-body">
                    <p className="card-text">
                        {name}
                    </p>

                    <p className='card-text'>
                        {GroupService.getName(props.student.group)}
                    </p>
                    <h5 style={{color:"#205798",paddingTop:"10px"}}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} > Обучается</h5>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            Обучается
                        </MenuItem>
                        <MenuItem>
                            На дуальном
                        </MenuItem>
                        <MenuItem>
                            Академический отпуск
                        </MenuItem>
                        <MenuItem>
                            Отчислен
                        </MenuItem>

                    </StyledMenu>
                </div>
            </div>
            </div>
        </div>
    )
}

export default StudentItem;