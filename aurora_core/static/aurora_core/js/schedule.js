var modal;
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
var eventsMap;

window.onload = function(){
    loadLabels();
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
            day.dataset.day = days[7*w+d];
            day.dataset.month = date.getMonth() + 1;
            day.dataset.year = date.getFullYear();
            td.appendChild(day);
            day.onclick = function() {
//                modal.show();
            }
        }
    }

    loadEvents(date.getMonth() + 1);
    ss();
    return date;
}

function loadLabels(){
    $.ajax({
        url: label_list_url,
        type: "get",
        context: document.body,
        success: function(data){
            console.log(data);
        }
    });
}

function loadEvents(month){
    $.ajax({
        url: event_list_url,
        type: "get",
        context: document.body,
        data: {month:  month},
        success: function(data){
            eventsMap = new Map();
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
                var $day = $('*[data-day="'+ key + '"]');
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


function ss(){
    $('.day').on('click', function(){
        dataset = this.children[0].dataset;
        var data;
        var date = dataset.year + "-" + dataset.month + "-" + dataset.day;
        if(eventsMap.has(parseInt(dataset.day))){
            events = eventsMap.get(parseInt(dataset.day));
            data = events[0];
        }
        console.log();

        $.ajax({
            url: create_event_url,
            type: "get",
            data: data,
            success: function(data) {
                $('#modal').modal('show');
                $('#modal-content').html(data);

                $("#form").submit(function(e){
                    var postUrl = $(this).attr('action');
                    var postData = $(this).serialize() + '&date=' + date;
                    $.ajax({
                         url: create_event_url,
                         type: "post",
                         data: postData,
                         success: function(data) {
                            console.log(data);
                         },
                         error: function(data){
                            console.log(data);
                         }
                    });
                });
            },
            error:  function(data) {
                console.log(data);
            }
        });
    });
}
