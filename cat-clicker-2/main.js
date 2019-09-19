var ViewModel = function(){
    this.clickCounter = ko.observable(0);
    this.name = ko.observable('Haha');
    this.image = ko.observable('cat1.jpg');
    this.imageClicked = function(){
        let oldCounter = this.clickCounter();
        this.clickCounter(oldCounter+1);
    };
    this.level = ko.observable('new born');
    this.levelChange = ko.computed(function(){
        let level = 'newborn';
        let checkcounter = this.clickCounter();
        if(checkcounter>10){
            level = 'teen';
        }
        return level;
    },this);
    this.nickNames = ko.observableArray([['wow','pew','lol','Mr. Meow']]);
}

ko.applyBindings(new ViewModel());