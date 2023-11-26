let month ={
    "1":"فروردین",
    "2":"اردیبهشت",
    "3":"خرداد",
    "4":"تیر",
    "5":"مرداد",
    "6":"شهریور",
    "7":"مهر",
    "8":"آبان",
    "9":"آذر",
    "10":"دی",
    "11":"بهمن",
    "12":"اسفند",
  }
const Day = ({date})=>{
    return(
        <>
        <div class="day">
            <div class="date">
                <p class="date-num">{date[2]}</p>
                <p class="date-day">{month[date[1]]}</p>
            </div>
            <div class="events shadow">
                <div class="event shadow start-8-15 end-8-45 ">
                    <p className="action-btn">
                        <i className="fe fe-edit"></i>
                        <i className="fe fe-trash"></i>
                    </p>
                    <p class="title" > <i className="fe fe-user"></i> ستار داودی</p>
                    <p class="time"> <i className="fe fe-clock"></i> 0:15 تا 0:45</p>
                </div>
                <div class="event shadow start-0-15 end-0-45 ">
                    <p className="action-btn">
                        <i className="fe fe-edit"></i>
                        <i className="fe fe-trash"></i>
                    </p>
                    <p class="title" > <i className="fe fe-user"></i> ستار داودی</p>
                    <p class="time"> <i className="fe fe-clock"></i> 0:15 تا 0:45</p>
                </div>
                <div class="event shadow start-0-45 end-1-15 ">
                <p className="action-btn">
                    <i className="fe fe-edit"></i>
                    <i className="fe fe-trash"></i>
                </p>
                <p class="title" > <i className="fe fe-user"></i> ستار داودی</p>
                <p class="time"> <i className="fe fe-clock"></i> 0:15 تا 0:45</p>
                </div>
            </div>
            </div>
        </>
    )
}
export default Day