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
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

var eventsMap, isLoad = true;

window.onload = function(){
    date = loadCalendar(new Date());
    document.getElementById('next_month').onclick = () => {
        date = getNextMonth(date);
        loadCalendar(date);
    };
    document.getElementById('prev_month').onclick = () => {
        date = getPrevMonth(date);
        loadCalendar(date);
    };
}

function getArrayDaysInMont(date){
    var days = []
    var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var countDaysInMonth = lastDate.getDate();
    var countPreDays = firstDate.getDay();
    countPreDays = countPreDays == 0 ? 7 : countPreDays;

    for (var i = 1; i < countPreDays; i++)
        days.push(undefined);

    for (var i = 1; i <= countDaysInMonth; i++)
        days.push(i);
    return days;
}

function loadCalendar(date){
    days = getArrayDaysInMont(date);
    calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    document.getElementById('month').innerHTML = months[date.getMonth()] + ' ' + date.getFullYear() ;
    for(var w = 0; w < days.length/7; w++){
        week = document.createElement("tr");
        calendar.appendChild(week);
        for(var d = 0; d < 7; d++){
            td = document.createElement("td");
            week.appendChild(td);
            if (days[7*w+d] == undefined) continue;
            td.classList.add("day");
            td.classList.add("text-center");
            day = document.createElement("div");
            day.textContent = days[7*w+d];
            day.dataset.index = days[7*w+d];
            td.appendChild(day);
        }
    }

    loadEvents(date.getMonth() + 1);

    return date;
}

function loadEvents(month){
    isLoad = true;
    $.ajax({
        url: event_list_url,
        type: "get",
        context: document.body,
        data: {month:  month},
        success: function(data){
            var eventsMap = new Map();
            data.forEach(function(element){
                var date = new Date(element.date).getDate();
                if (eventsMap.has(date)){
                    var events = eventsMap.get(date);
                    events.push(element);
                }
                else
                    var events = [element];
                eventsMap.set(date, events);
            });

            eventsMap.forEach(function(element, key){
                var $day = $('*[data-index="'+ key + '"]');
                $day.addClass("selected_day");
            });
            console.log(eventsMap);
        }
    });
}

function getNextMonth(date){
    if (date.getMonth() == 11) {
        var next = new Date(date.getFullYear() + 1, 0, 1);
    } else {
        var next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    return next
}

function getPrevMonth(date){
    if (date.getMonth() == 0) {
        var next = new Date(date.getFullYear() - 1, 11, 1);
    } else {
        var next = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }
    return next
}

//var year, month,
//    modal = new bootstrap.Modal(document.getElementById('Modal'));

//    var monthsP=[
//       'января',
//       'февраля',
//       'марта',
//       'апреля',
//       'мая',
//       'июня',
//       'июля',
//       'августа',
//       'сентября',
//       'ноября',
//       'декабря',
//    ];

//    $('#Month').text(months[m]);

//    var days = document.getElementsByClassName('day');
//    for (let i = 0; i < days.length; i++) {
//        days[i].onclick = function() {
//            modal.show();
//            $('#ModalLabel').text(i + 1 + " " + monthsP[m] + " " + y);
//            var $day = $('*[data-index="'+ (i + 1) + '"]');
//            $description = $('#Modal').find('#id_description');
//            $description.html('');
//            $description.html($day.data().description);
//        }
//    }
//
//    loadData(m + 1);
//}
//
////function loadEventForm(){
////    $.ajax({
////        url: event_create_form_url,
////        type: "get",
////        success: function(data){
////            $('#Modal').find('.modal-body').html(data);
////            $('#modalForm').attr('action', event_create_form_url);
////        }
////    });
////}
//
//

//}
//
//function addfirstweek(calendar, firstDay) {
//    week = document.createElement("tr");
//    calendar.appendChild(week);
//
//    if (firstDay == 0) firstDay = 7;
//
//    for (let i = 0; i < firstDay - 1 ; i++) {
//        week.appendChild(document.createElement("td"));
//    }
//
//    for (var index = 1; index <= 8 - firstDay; index++) {
//        td = document.createElement("td");
//        td.classList.add("text-center");
//        day = document.createElement("day");
//        day.textContent = index;
//        day.dataset.index = index;
//        day.classList.add("day");
//        td.appendChild(day);
//        week.appendChild(td);
//    }
//
//    return index;
//}
//

