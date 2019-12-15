var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU2MjFiMjJiZDViNzMxOGVkNDhlMTU0ZjVkNzBlNmQwZjBiY2NhZTIyYzllZTdjZWUwM2UyNzljYTFjY2Q2ZGQzMDc3NGQzZDJkMWJiMWU3In0.eyJhdWQiOiIxMCIsImp0aSI6ImU2MjFiMjJiZDViNzMxOGVkNDhlMTU0ZjVkNzBlNmQwZjBiY2NhZTIyYzllZTdjZWUwM2UyNzljYTFjY2Q2ZGQzMDc3NGQzZDJkMWJiMWU3IiwiaWF0IjoxNTcyNDYyODU2LCJuYmYiOjE1NzI0NjI4NTYsImV4cCI6MTg4ODA4MjA1Niwic3ViIjoiMTk0NiIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.2zU39RMuTj8_Sja8qDehurMBACYczNurn-RlWAkh5UlyQAEF_OF9cuKVOzbgTrOEg-UcbBdeYvqyZlWxy1NPr9QdaSJGIh7JYo3y3EWE3MWl2yQNj4HAqly2R7hHv5x2887Hnz_PY2J1uR1QKVq1nXCxIVsSDcIwYmsIsNecWnUm3QeD4KFkjOJQUmZcj_XYWVCjsCUY4l1g8mw49qkpbT0bkD7XOrlpT7ktp5K6oEizvoMbqw6sA9jxC6VqH5rfoH9LLaDm0WopPcvLAOIgFY5vvvNtaIJoPIoXHQD_IPY5FxEWWuOZz8Su4-17QKa7SFXmc4jkfU4VYtA4CBFcRXk9Y1tvmU99NI4K_gXT-PUUosgNWfJc9rAQqcY9SuN2fKvOUycjUnDTsG5_J_cznzMaO_ozUCL6fwfRiBypRMlltp_KNsbGiOtHuMJXEzveK5zQpmfUWBbY1uPdl5Knx_SbgMDs6rTgs9YGeQ2MWsicZuJuuAxDIANNwCGeFrflBh4ZZHR_MuYAFtnGR1kSVjbKjmcllo8mP-fF9QyCqbrrr5fR9zNbFSr3H1rrrLVLALd-RfaaKjNxyx8N4we-BfEosMBnkoHG2JeX-sL3bwz2ys3KxodgeusCbntEOsV7MqS0y3DNQ17uYnGwdoic6eeq0xEdT5ktG0YcZ52Q9A4';
var client = new INTITAClient({
    key: API_KEY,
});



// ---------------------MAIN INFORMATION------------------------
let profileInfo = ['Імя: ','Прізвище: ','Пошта: ','Телефон: ','Адреса проживання: ','Країна: ','Місто: ','Форма навчання: '];
let ul = document.getElementById('ul');
let j = 0;
let tmp;
client.getUserDetails(function (error, data) {
    for (let i in data) {
        if (data[i]) {
            if (i === 'avatar') {
                setAvatar("photo", data[i]);
                continue;
            }
            if ( typeof data[i] === (typeof {})){
                continue;
            }
            tmp = document.createElement('li');
            tmp.innerHTML = profileInfo[j] + data[i];
            j++;
            ul.append(tmp);
        }
    }
});

//---------------------------MODUES AND LECTURES------------------------------
client.getUserCoursesAndModules(function (error, data) {
    ModulesId = data.courses[1].id;
    let cour = document.getElementById('modul');
    let li = document.createElement('li');
    cour.innerHTML += ' ' + data.courses[1].title;

client.getCourseModules(ModulesId,function (error,modules) {

    let ulMod = document.getElementById('modules_to_show');
    let tmp;
    for (let mod in modules) {

        tmp = document.createElement('span');
        tmp.innerHTML = modules[mod].title;
        tmp.setAttribute('data-toggle', 'collapse');
        tmp.setAttribute('href', '#hide_' + modules[mod].id);
        tmp.style.display = "flex";

        let div = document.createElement('div');
        div.id = 'hide_' + modules[mod].id;
        div.className = 'collapse';

        let uli = document.createElement('ul');
        uli.style.display = 'flex';
        uli.style.flexDirection = 'column';
        uli.style.listStyleType = "decimal";

        addLectures(modules[mod].id, uli);

        div.appendChild(uli);
        tmp.appendChild(div);
        ulMod.append(tmp);
    }
})});

//----------------------------------FUNCTIONS--------------------------------------


function setAvatar (id, src) {
    let img = document.getElementById(id);
    img.src = src;
}

function addLectures(id, target) {
    client.getModuleLectures(id,function (error,lectures) {
        for(let i of lectures){
            let li = document.createElement('li');
            li.innerHTML = i.title;
            target.appendChild(li);
        }
    });
}


let span = document.getElementById('head_text').firstElementChild;

let str  = 'Привіт, вітаю тебе на моїй персональній сторінці, тут ти зможеш знайти деяку інформацію про мене.';

for(let i = 0; i < str.length; i++) {
    setTimeout(() => span.innerHTML += str[i], 50 * i);
}

let span1 = document.getElementById('head_time').firstElementChild;
let set;
setInterval(() => {
    let date = new Date();
    set = (date.getHours() + ':' + (date.getMinutes()<10? '0'+date.getMinutes() : date.getMinutes())+':' + (date.getSeconds()<10? ('0'+date.getSeconds()) : date.getSeconds())).toString();
    span1.innerHTML = set;
},1000);





