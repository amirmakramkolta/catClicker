class CatsInfo{
    constructor(name,image){
        this.name = name;
        this.image = image;
        this.count = 0;
    }
}
var model = [
    new CatsInfo('haha','cat1.jpg'),
    new CatsInfo('pew','cat2.jpg'),
    new CatsInfo('wow','cat3.jpg'),
    new CatsInfo('lol','cat4.jpg'),
    new CatsInfo('hkh','cat5.jpg')
];
var _currentModel = {
    index: 0,
    getName: function(){
        return model[this.index].name;
    },
    setName: function(name){
        model[this.index].name = name;
    },
    getImage: function(){
        return model[_currentModel.index].image;
    },
    setImage:function(image){
        model[_currentModel.index].image = image;
    },
    getCount: function (){
        return model[_currentModel.index].count;
    },
    setCount: function(count){
        model[_currentModel.index].count = count;
    }
}
var octopus = {
    initNames: function(){
        let catNames = [];
        for(let obj of model){
            catNames.push(obj.name);
        }
        return catNames;
    },
    initPics: function(){
        let catPics =[];
        for(obj of model){
            catPics.push(obj.image);
        }
        return catPics;
    },
    initCounters: function(){
        let catCounters=[];
        for(obj of model){
            catCounters.push(obj.count);
        }
        return catCounters;
    },
    getCurrentCat: function(){
        return _currentModel;
    },
    setCurrentCat: function(index){
        _currentModel.index = index;
        //this make a error
        // _currentModel.setName(name);
        // _currentModel.setImage(image);
        // _currentModel.setCount(count);
    },
    setCurrentCatCounter: function(count){
        model[_currentModel.index].count = count;
    },
    cancelChanges: function(cancel,formCon){
        cancel.addEventListener('click', ()=>{
            formCon.removeChild(formCon.childNodes[0]);
        })
    },
    submitChanges: function(submit,name,image){
        submit.addEventListener('click',()=>{
            _currentModel.setName(name.value);
            _currentModel.setImage(image.value);
            let cats = document.querySelectorAll('.cat-list');
            let catName = document.querySelector('#area h2');
            let catImg = document.querySelector('#area img');
            cats[_currentModel.index].innerHTML = name.value;
            catName.textContent = name.value;
            catImg.src = image.value;
        })
    }
};
var view = {
    init: (function(){
        let list = document.getElementById('list');
        let catArrNames = octopus.initNames();
        let set='';
        for(let index of catArrNames){
            set += `<li class='cat-list'>${index}</li>`;
        }
        list.innerHTML = set;
    })(),
    listClicker: (function(){
        let area = document.getElementById('area');
        let cats = document.querySelectorAll('.cat-list');
        let catName = document.querySelector('#area h2');
        let catImg = document.querySelector('#area img');
        let counter = document.querySelector('#area p');
        var currentCat = octopus.getCurrentCat();
        for(let i = 0; i<cats.length;i++){
            cats[i].addEventListener('click',function(){
                area.style.display = "block";
                octopus.setCurrentCat(i);
                catName.textContent = currentCat.getName();
                catImg.src = currentCat.getImage();
                counter.innerHTML = octopus.getCurrentCat().getCount();
            });
        }
    })(),
    catClicker: (function(){
        let catImg = document.querySelector('#area img');
        let counter = document.querySelector('#area p');
        catImg.addEventListener('click',function(){
            let setCurrentCounter = octopus.getCurrentCat().getCount();
            setCurrentCounter++;
            counter.innerHTML = setCurrentCounter;
            octopus.setCurrentCatCounter(setCurrentCounter);
        });
    })(),
    adminBtn: (function(){
        let admin = document.querySelector('#area button');
        let formCon = document.getElementById('form');
        admin.addEventListener('click',()=>{
            formCon.innerHTML = `<form>
            <label for='name'>Name: </label>
            <input id = 'name' type = 'text' value = ${octopus.getCurrentCat().getName()}>
            <label for='image'>Image Source: </label>
            <input id='image' type = 'text' value = ${octopus.getCurrentCat().getImage()}>
            <button type="submit" value="Submit" id='submit'>Submit</button>
            <button value="Cancel" id = 'cancel'>Cancel</button>
            </form>`
            let cancel = document.getElementById('cancel');
            let submit = document.getElementById('submit');
            let name = document.getElementById('name');
            let image = document.getElementById('image');
            octopus.cancelChanges(cancel,formCon);
            octopus.submitChanges(submit,name,image);
        })
        formCon.addEventListener('submit',(e)=>{
            e.preventDefault();
        })
    })()
};