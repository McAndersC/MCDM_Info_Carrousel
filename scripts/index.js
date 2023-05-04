// Her importerer vi vores service.js fil, som indeholder vores funktioner til at hente data fra vores API.
import service from "./service.js";

const app = {};

// Den Template vi benytter på skærmen
app.tmpl = (data) => {
    return `<div>
        <div class="info-schedule-container">

        ${data.schedule.map((item) => {

            return `<div class="info-schedule-item" data-item="schedule_${item.id}">
                <h1>${item.title}</h1>
                <p>${(new Date(item.start).toLocaleTimeString('da-DK',  { hour: "2-digit", minute: "2-digit" }))} - ${(new Date(item.end).toLocaleTimeString('da-DK',  { hour: "2-digit", minute: "2-digit" }))}  </p>
            </div>`

        }).join('')}

        </div>
        <div class="overlay">${data.title}</div>
        <img class="bg fade-in" src="${data.image}" alt="${data.title}" />

    </div>`
}

// Denne funktion tjekker om der er et skema der passer med det aktuelle tidspunkt
app.checkSchedule = (item) => {
 
    let d = new Date();
    let start = new Date(item.start).getTime();
    let end = new Date(item.end).getTime();
    const elm = document.querySelector(`[data-item="schedule_${item.id}"]`);
    elm.classList.remove('active');
    
    if(start <= d.getTime() && end >= d.getTime()) {
        elm.classList.add('active');
    }

};

// Denne funktion render vores data på skærmen
app.render = (data) => {

    const container = document.querySelector('#info-container');

    data.forEach((item) => {

        if (new Date(item.date).getDate() === new Date().getDate()) {
            container.innerHTML = app.tmpl(item)

            setInterval(async () => {

                item.schedule.forEach((item) => app.checkSchedule(item));

            }, 1000);

            item.schedule.forEach((item) => app.checkSchedule(item));
        }   

    });

}

// Denne funktion render vores ur på skærmen
app.renderClock = () => {
    setInterval(async () =>  {

        let t = await service.getTime();

        var timeContainer = document.querySelector('.time-container')
        timeContainer.textContent = ('0' + t.h).slice(-2) + ":" + ('0' + t.m).slice(-2) + ":" + ('0' + t.s).slice(-2);

    }, 1000);

};

// Denne funktion initierer vores app
app.init = () => {

  service.getData().then(data => {

    app.render(data);
    app.renderClock();

  });

};

// Vi kalder vores init funktion.
app.init();