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
    '',
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
var eventsMap, labelsMap, labelsMap_id;

window.onload = async function(){
    await loadLabels();
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
        }
    }

    loadEvents(date.getMonth() + 1);
    addDayEvent();
    return date;
}

function loadEvents(month){
    return $.ajax({
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
                var label = element[0].label;
                console.log();
                $day.addClass("selected_day");
                $day.css("background-color", labelsMap_id.get(label).color);
            });
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

function addDayEvent(){
    $('.day').on('click', function(){
        dataset = this.children[0].dataset;
        var data;
        var date = dataset.year + "-" + dataset.month + "-" + dataset.day;
        var date_user = dataset.day + " " + monthsP[dataset.month] + " " + dataset.year;
        if(eventsMap.has(parseInt(dataset.day))){
            events = eventsMap.get(parseInt(dataset.day));
            data = events[0];
        }

        $.ajax({
            url: create_event_url,
            type: "get",
            data: data,
            success: function(data_form) {
                showModal(data_form, date_user);
                label = $('#label').val();
                if (labelsMap.has(label))
                    $('#color').val(labelsMap.get(label).color);

                $(document).on('change', '#label', function() {
                    label = $(this).val();
                    if (labelsMap.has(label))
                        $('#color').val(labelsMap.get(label).color);
                });

                $("#form").submit(async function(e){
                    var $label = $(this).find("#label")
                    var $color = $(this).find("#color")
                    var label_id = await updateOrCreateLabel($label.val(), $color.val());
                    $label.val(label_id);
                    console.log($label.val());

                    var postUrl = $(this).attr('action');
                    var postData = $(this).serialize() + '&date=' + date ;
                    if (data != undefined)
                        postData = postData + '&id=' + data.id;
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

function showModal(data, date_user){
    $('#modal-content').html(data);
    $('#modal-title').html(date_user);
    $('#modal').modal('show');
}

function loadLabels(){
    $.ajax({
        url: label_list_url,
        type: "get",
        success: function(data){
            labelsMap = new Map();
            labelsMap_id = new Map();
            data.forEach(function(label){
                labelsMap.set(label.title, label);
                labelsMap_id.set(label.id, label);
            });
        }
    });
}

async function updateOrCreateLabel(val, hex) {
    if (labelsMap.has(val)) {
        var label = labelsMap.get(val);
        return label.id
    }
    else {
        var data = await CreateLabel(val, hex);
        return data.id;
    }

}

//function sleep(milliseconds) {
//  const date = Date.now();
//  let currentDate = null;
//  do {
//    currentDate = Date.now();
//  } while (currentDate - date < milliseconds);
//}

function CreateLabel(val, hex){
    return $.ajax({
        url: label_list_url,
        type: "post",
        data: {title: val, color: hex},
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        success: function(data){
            console.log(data);
        },
        error: function(data){
            console.log(data);
        }
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}