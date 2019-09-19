class CatMaker{
    constructor(name,image,nickNames){
        this.clickCounter = 0
        this.name = name;
        this.image = image;
        this.nickNames = nickNames;
    }
}
var initCats = [
    new CatMaker('Tabby','cat1.jpg',['wow','pew','lol','Mr. Meow']),
    new CatMaker('Tiger','cat2.jpg',['tigger']),
    new CatMaker('Kokky','cat3.jpg',['woow']),
    new CatMaker('Raven','cat4.jpg',['besty']),
    new CatMaker('Robin','cat5.jpg',['bomba'])
];
class Cat{
    constructor(data){
        this.clickCounter = ko.observable(data.clickCounter);
        this.name = ko.observable(data.name);
        this.image = ko.observable(data.image);
        this.levelChange = ko.computed(function(){
            let level = 'newborn';
            let checkcounter = this.clickCounter();
            if(checkcounter>10){
                level = 'teen';
            }
            return level;
        },this);
        this.nickNames = ko.observableArray(data.nickNames);
    }
}
var ViewModel = function(){
    var self = this;
    this.catList = ko.observableArray([]);
    initCats.forEach(function(catItem){
        self.catList.push( new Cat(catItem) );
    });
    this.currentCat = ko.observable(this.catList()[0]);
    this.imageClicked = function(){
        let oldCounter = self.currentCat().clickCounter();
        self.currentCat().clickCounter(oldCounter+1);
    };
    // this.selectedCat = function(index){
    //     let catArray = self.catList();
    //     self.currentCat = ko.observable(catArray[index]);
    // };
    this.setCat = function(clickedCat) {
        self.currentCat(clickedCat)
    }
}

ko.applyBindings(new ViewModel());