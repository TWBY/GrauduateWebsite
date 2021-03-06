// console.log("Information");


new Vue({
    el: "#app",
    data: function () {
        return {
            //Common
            isMenuOpen: false,
            //Custom
            MapsInfo: "",
            MapInfo: {
                time: "",
                location: "",
                cost: "",
                traffic: "",
                map: "",
            },
            isTextActive: false,
            selectIndex: 0
        }
    },
    created() {
        axios.get('../asset/json/MapInfo.json').then(val => {
            var vm = this;
            vm.MapsInfo = val.data;
            this.MapInfo.time = this.MapsInfo[0].time;
            this.MapInfo.location = this.MapsInfo[0].location;
            this.MapInfo.cost = this.MapsInfo[0].cost;
            this.MapInfo.traffic = this.MapsInfo[0].traffic;
            this.MapInfo.map = this.MapsInfo[0].map;
        })
    },
    methods: {
        ChangePeopleInfo(Index) {
            if (this.selectIndex != Index) {
                this.selectIndex = Index;
                this.isTextActive = true

                setTimeout(() => {
                    this.MapInfo.time = this.MapsInfo[Index].time;
                    this.MapInfo.location = this.MapsInfo[Index].location;
                    this.MapInfo.cost = this.MapsInfo[Index].cost;
                    this.MapInfo.traffic = this.MapsInfo[Index].traffic;
                    this.MapInfo.map = this.MapsInfo[Index].map;
                }, 400)

                setTimeout(() => {
                    this.isTextActive = false
                }, 900)

            }

        },
        ChangeActiveBarPoa(index) {
            let navbarOuter = document.querySelector('.navbarOuter');
            let activeBar = document.querySelector('.activeBar');
            let navItem = document.getElementsByClassName("nav-item");
            let navbarOuterWidth = navbarOuter.clientWidth

            transRange = index * (navbarOuterWidth / navItem.length);
            activeBar.style.transform = 'translateX(' + transRange + 'px)';

            let navLink = document.querySelectorAll('.nav-link');
            for (let i = 0; i < navLink.length; i++) {
                if (i == index) {
                    navLink[i].style.color = "white"
                } else {
                    navLink[i].style.color = "#044EB7"
                }
            }

        }
    }
})