angular.module('App.controllers', [])

.controller('StarterCtrl', function($scope) {

})

.controller('HomeCtrl', function($scope, $state) {
    $scope.isHomePage = true;
    $scope.goSignUp = function() {
      $state.go('start.signup');
    }
    $scope.goLogIn = function() {
      $state.go('start.login');
    }
})

.controller('SignUpCtrl', function($scope, $state, $timeout) {
  $scope.data = {
    username: 'Jon Smith',
    email:    'jonsmith@gmail.com',
    password: '12345678',
    confirmPwd: '12345678'
  };
  $scope.doSignUp = function() {
    $timeout(function() {
      $state.go('app.dashboard');
    }, 500);
  }
})

.controller('LoginCtrl', function($scope, $state, $timeout) {
    $scope.data = {
      username: 'Jon Smith',
      password: '12345678',
    };
    $scope.doLogIn = function() {
      $timeout(function() {
        $state.go('app.dashboard');
      }, 500);
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('DashboardCtrl', function($scope, $state) {
    $scope.goContacts = function() {
      $state.go('app.contacts');
    }
    $scope.goSetting = function() {
      $state.go('app.setting');
    }
    $scope.goCalendar = function() {
      $state.go('app.calendar');
    }
    $scope.goOffer = function() {
      $state.go('app.offer');
    }

    $scope.icon_class = 'ion-ios-settings';

    $scope.itemList = [
      { title: 'Contacts', action: '#/app/contacts', icon: 'img/contacts.png', addnew: false, badge: 0 },
      { title: 'Messages', action: '#',              icon: 'img/messages.png', addnew: false, badge: 1 },
      { title: 'Settings', action: '#/app/setting',  icon: 'img/settings.png', addnew: false, badge: 0 },
      { title: 'Places',   action: '#',              icon: 'img/place.png',   addnew: false, badge: 0 },
      { title: 'Calendar', action: '#/app/calendar', icon: 'img/calendar.png', addnew: false, badge: 0 },
      { title: 'Chat',     action: '#',              icon: 'img/chats.png', addnew: false, badge: 2 },
      { title: 'Add More', action: '#/app/offer',    icon: 'img/plus.png', addnew: true,  badge: 0 },
    ];
})

.controller('ContactsCtrl', function($scope) {
    $scope.contactslist = [
      { id: 0, name: 'Jarrett Conley', desc: 'Designer', online: true, profile: 'img/profile-01.jpg', popup: false},
      { id: 1, name: 'Bradley Mccarthy', desc: 'Designer', online: true, profile: 'img/profile-02.jpg', popup: false },
      { id: 2, name: 'Alexander Jordan', desc: 'Designer', online: false, profile: 'img/profile-03.jpg', popup: false },
      { id: 3, name: 'Jenson Burns', desc: 'Designer', online: true, profile: 'img/profile-04.jpg', popup: false },
      { id: 4, name: 'Frankie John', desc: 'Designer', online: true, profile: 'img/profile-05.jpg', popup: false },
      { id: 5, name: 'Ethan Taylor', desc: 'Designer', online: false, profile: 'img/profile-06.jpg', popup: false },
      { id: 6, name: 'Immanuel Ward', desc: 'Designer', online: true, profile: 'img/profile-07.jpg', popup: false },
      { id: 7, name: 'Draven Rodriguez', desc: 'Designer', online: true, profile: 'img/profile-08.jpg', popup: false },
      { id: 8, name: 'Emilio Brock', desc: 'Designer', online: false, profile: 'img/profile-09.jpg', popup: false },
      { id: 9, name: 'Lilian Stark', desc: 'Designer', online: true, profile: 'img/profile-10.jpg', popup: false },
      { id: 10, name: 'Martha Hussain', desc: 'Designer', online: true, profile: 'img/profile-11.jpg', popup: false },
    ];

    $scope.onItemSwipeRight = function(id) {
      for (var i=0; i<$scope.contactslist.length; i++) {
        $scope.contactslist[i].popup = false;
      }
      $scope.contactslist[id].popup = true;
    }

    $scope.onItemSwipeLeft = function(id) {
      $scope.contactslist[id].popup = false;
    }
})

.controller('SettingCtrl', function($scope, $ionicModal, $timeout) {

    $scope.soundTurnOn = [true, false];
    $scope.onClickSoundBtn = function(id) {
      $scope.soundTurnOn[id] = !$scope.soundTurnOn[id];
    }

    $scope.social_swiped = [false, false, false];

    $scope.onItemSwipeRight = function(id) {
      for (var i=0; i<$scope.social_swiped.length; i++) {
        $scope.social_swiped[i] = false;
      }
      $scope.social_swiped[id] = true;
    }
    $scope.onItemSwipeLeft = function(id) {
      $scope.social_swiped[id] = false;
    }
})

.controller('CalendarCtrl', function($scope) {

    $scope.weekTitle = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    $scope.today = moment();
    $scope.selected = _removeTime($scope.selected || moment());
    $scope.month = $scope.selected.clone();

    var start = $scope.selected.clone();
    start.date(1);
    _removeTime(start.day(0));

    _buildMonth($scope, start, $scope.month);

    $scope.select = function(day) {
      $scope.selected = day.date;
    };

    $scope.next = function() {
      var next = $scope.month.clone();
      _removeTime(next.month(next.month()+1).date(1));
      $scope.month.month($scope.month.month()+1);
      _buildMonth($scope, next, $scope.month);
    };

    $scope.previous = function() {
      var previous = $scope.month.clone();
      _removeTime(previous.month(previous.month()-1).date(1));
      $scope.month.month($scope.month.month()-1);
      _buildMonth($scope, previous, $scope.month);
    };

    function _removeTime(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
      scope.weeks = [];
      var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
      while (!done) {
        scope.weeks.push({ days: _buildWeek(date.clone(), month) });
        date.add(1, "w");
        done = count++ > 2 && monthIndex !== date.month();
        monthIndex = date.month();
      }
    }

    function _buildWeek(date, month) {
      var days = [];
      for (var i = 0; i < 7; i++) {
        days.push({
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date
        });
        date = date.clone();
        date.add(1, "d");
      }
      return days;
    }

    $scope.soundTurnOn = [true, false];
    $scope.onClickSoundBtn = function(id) {
      $scope.soundTurnOn[id] = !$scope.soundTurnOn[id];
    }

    $scope.social_swiped = [false, false, false];

    $scope.onItemSwipeRight = function(id) {
      for (var i=0; i<$scope.social_swiped.length; i++) {
        $scope.social_swiped[i] = false;
      }
      $scope.social_swiped[id] = true;
    }
    $scope.onItemSwipeLeft = function(id) {
      $scope.social_swiped[id] = false;
    }
})

.controller('OfferCtrl', function($scope, $state) {
    $scope.tab_active = [true, false, false];
    $scope.onClickTab = function(id) {
      for (var i=0; i<$scope.tab_active.length; i++) {
        $scope.tab_active[i] = false;
      }
      $scope.tab_active[id] = true;
    }

    $scope.slideList = [
      { cost: 120.0 },{ cost: 32.0 },{ cost: 25.0 },{ cost: 17.0 },{ cost: 23.0 },{ cost: 74.0 },{ cost: 63.5 }
    ];
});
