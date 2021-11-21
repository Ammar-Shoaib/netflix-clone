import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { useState, useEffect, useMemo } from 'react'
import axios from "axios";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
  
  const MONTHS = useMemo(() => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ], []
  )

  const [userStats, setUserStats] = useState([])

  useEffect(() => {
    const getStats = async() => {
      try {
        const res = await axios.get('users/stats', {
          headers: {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2NkYzAxNGNkZDNiZWY1MWIwYWVjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTY1MzkzOCwiZXhwIjoxNjM2MDg1OTM4fQ.v7N0Gd0cnUXGS2o8C81eli3RyXWUMBHjPxb3vJ_5sTQ'
          }
        })
        const statsList = res.data.sort(function(a, b) {
          return a._id - b._id
        })
        statsList.map(item => setUserStats(prev => [...prev, { name:MONTHS[item._id - 1], 'New User': item.total }]))
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
