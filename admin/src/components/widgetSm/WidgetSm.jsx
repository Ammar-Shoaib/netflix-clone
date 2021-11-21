import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {

  const [newUsers, setNewUsers] = useState([])

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('users?new=true', {
          headers: {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2NkYzAxNGNkZDNiZWY1MWIwYWVjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTY1MzkzOCwiZXhwIjoxNjM2MDg1OTM4fQ.v7N0Gd0cnUXGS2o8C81eli3RyXWUMBHjPxb3vJ_5sTQ'
          }
        })
        setNewUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNewUsers()
  })

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => (
          <li className="widgetSmListItem">
            <img
              src={user.profilePic || 'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
