var year, month,
    modal = new bootstrap.Modal(document.getElementById('Modal'));

window.onload = function() {
    var date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    loadcalendar(year, month);

    var prev = document.getElementById('Prev-Month');
    prev.onclick = function() { month = month == 0 ? month + 10 : month - 1; loadcalendar(year, month) };
    var next = document.getElementById('Next-Month');
    next.onclick = function() { month++; month %= 11; loadcalendar(year, month) };
}

function loadcalendar(y, m) {
    var months=[
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Ноябрь',
        'Декабрь',
     ];

    var monthsP=[
       'января',
       'февраля',
       'марта',
       'апреля',
       'мая',
       'июня',
       'июля',
       'августа',
       'сентября',
       'ноября',
       'декабря',
    ];

    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    $('#Month').text(months[m]);

    calendar = document.getElementById('Calendar');
    calendar.innerHTML = '';

    var day = addfirstweek(calendar, firstDay.getDay());
    for (let i = day; i < lastDay.getDate(); i = i + 7) {
        addweek(calendar, i, lastDay.getDate());
    }

    var days = document.getElementsByClassName('day');
    for (let i = 0; i < days.length; i++) {
        days[i].onclick = function() {
//            this.classList.toggle("selected_day");
            modal.show();
            $('#ModalLabel').text(i + 1 + " " + monthsP[m] + " " + y);
        }
    }

    loadData(m + 1);
}

function loadData(month){
    $.ajax({
        url: event_list_url,
        type: "get",
        context: document.body,
        data: {month:  month},
        success: function(data){
            console.log(data);
        }
    });
}

function addfirstweek(calendar, firstDay) {
    week = document.createElement("tr");
    calendar.appendChild(week);

    if (firstDay == 0) firstDay = 7;

    for (let i = 0; i < firstDay - 1 ; i++) {
        week.appendChild(document.createElement("td"));
    }

    for (var index = 1; index <= 8 - firstDay; index++) {
        td = document.createElement("td");
        td.classList.add("text-center");
        day = document.createElement("day");
        day.textContent = index;
        day.classList.add("day");
        td.appendChild(day);
        week.appendChild(td);
    }

    return index;
}

function addweek(calendar, firstDay, lastDay) {
    week = document.createElement("tr");
    calendar.appendChild(week);
    for (let index = firstDay; index < firstDay + 7; index++) {
        if (index <= lastDay){
            td = document.createElement("td");
            td.classList.add("text-center");
            day = document.createElement("day");
            day.textContent = index;
            day.classList.add("day");
            td.appendChild(day);
            week.appendChild(td);
        }
        else {
            week.appendChild(document.createElement("td"));
        }
    }
}
