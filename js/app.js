//-------------Model-------------
var model = {
  showAdmin: false,
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: 'Sowmya',
      image: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
    },
    {
      clickCount: 0,
      name: 'Tizzy',
      image: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
    },
    {
      clickCount: 0,
      name: 'Dom',
      image: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
    },
    {
      clickCount: 0,
      name: 'Felis',
      image: 'https://lh4.ggpht.com/M1XTibfCgpi5pgjSDb7kXDh21N8fpn-8evzQVAX-qGFhSyArDmSuCAv1pjVp4jbAt_g=h900'
    },
    {
      clickCount: 0,
      name: 'Mr. Whiskers',
      image: 'http://qtpi.org/wp-content/uploads/2014/04/kitten-cute-pictures.jpg'
    },
    {
      clickCount: 0,
      name: 'Harry Putter',
      image: 'https://lh3.ggpht.com/4kCi1_H566RFQrBcNYk5hKyA0TzlaxANZww2Kgf7Wp0dXmXyEQNw1ETG96OgG72oag=h900'
    },
    {
      clickCount: 0,
      name: 'Strong Thurmond',
      image: 'https://i.ytimg.com/vi/W-PBFMECvTE/maxresdefault.jpg'
    },
    {
      clickCount: 0,
      name: 'mixtape',
      image: 'http://40.media.tumblr.com/tumblr_kp3jpdIHWK1qzbpaho1_500.jpg'
    }
  ]
};

//-------------Octopus-------------
var octopus = {

  init: function() {
    model.currentCat = model.cats[0];
    listView.init();
    catView.init();
    adminView.init();
        },

  getCats: function() {
    return model.cats;
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
    console.log("current cat set to" + cat);
  },

  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },

  updateCurrentCat: function(clickCount, image, name) {
    model.currentCat.clickCount = clickCount;
    model.currentCat.name = name;
    model.currentCat.image = image;
    console.log("Updating Current Cat with" + clickCount + " " + image + " " + name);
    catView.render();
  },

  toggleAdmin: function(elem) {
    if (model.showAdmin == false) {
      model.showAdmin = true;
      adminView.show(elem);
    }
    else {
      model.showAdmin = false;
      adminView.hide(elem);
    }
  }

};

//-------------View-------------

var adminView = {
  init: function() {
    this.adminElem = document.getElementById('adminArea');
    this.adminButtonElem = document.getElementById('adminButton');
    this.adminDetailsElem = document.getElementById('adminDetails');
    var elem = document.createElement('form');
    console.log(elem);
    var nameDiv = document.createElement('div');
    var name = document.createElement('input');
    var imgUrlDiv = document.createElement('div');
    var imgUrl = document.createElement('input');
    var clicksDiv = document.createElement('div');
    var clicks = document.createElement('input');
    nameDiv.innerHTML = 'Cat Name:'
    name.type="text";
    name.name="name";
    imgUrlDiv.innerHTML = 'Image URL:'
    imgUrl.type="text";
    imgUrl.name="imgUrl";
    clicksDiv.innerHTML = 'Click Counter:'
    clicks.type="text";
    clicks.name="clicks";

    var cancel = document.createElement('button');
    cancel.type = "button";
    cancel.className = "btn btn-secondary";
    cancel.textContent = "Cancel";
    cancel.addEventListener('click', function() {
      octopus.toggleAdmin(elem);
    });

    var submit = document.createElement('button');
    submit.type = "button";
    submit.className = "btn btn-success";
    submit.textContent = "Submit";
    submit.addEventListener('click', function() {
      event.preventDefault();
      console.log(clicks);
      console.log(imgUrl);
      console.log(name);
      octopus.toggleAdmin(elem);
      octopus.updateCurrentCat(clicks.value, imgUrl.value, name.value);
      listView.render();
    })

    elem.appendChild(nameDiv);
    elem.appendChild(name);
    elem.appendChild(imgUrlDiv);
    elem.appendChild(imgUrl);
    elem.appendChild(clicksDiv);
    elem.appendChild(clicks);
    elem.appendChild(cancel);
    elem.appendChild(submit);

    this.adminButtonElem.addEventListener('click', function() {
      octopus.toggleAdmin(elem);
    });

    this.adminDetailsElem.appendChild(elem);
    this.hide(elem);

  },
  show: function(elem) {
    console.log("Show!");
    elem.style.visibility = 'visible';
  },

  hide: function(elem) {
    console.log("Made it to HIDE!");
    elem.style.visibility = 'hidden';
  }

};

var catView = {
  init: function() {
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('catName');
    this.catImageElem = document.getElementById('catImage');
    this.countElem = document.getElementById('counter');

    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    console.log("catView Initialized");
    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.image;
  }
};

var listView = {
  init: function() {
    this.catListElem = document.getElementById('catList');
    this.render();
  },

  render: function() {
    var cat, elem, i;
    var cats = octopus.getCats();
    console.log(cats);

    this.catListElem.innerHTML = '';
    for (var i = 0; i < cats.length; i++) {
      var cat = cats[i];
      var elem = document.createElement('div');
      elem.textName = cat.name;
      var aTag = document.createElement('a');
      aTag.setAttribute('href', '#');
      aTag.innerHTML = cat.name;
      elem.appendChild(aTag);

      elem.addEventListener('click', (function(catCopy) {
                     return function() {
                       console.log("This is the cat copy" + catCopy);
                         octopus.setCurrentCat(catCopy);
                         catView.render();
                     };
                 })(cat));

     this.catListElem.appendChild(elem);
    }
  }

};

octopus.init();

/*
  cat1.addEventListener('click', function(){
  //the element has been clicked...
  cat1count++;
  document.getElementById('counter1').innerHTML = cat1count;
  }, false);
  cat2.addEventListener('click', function(){
  //the element has been clicked...
  cat2count++;
  document.getElementById('counter2').innerHTML = cat2count;
  }, false);
*/
